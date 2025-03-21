import { Container, Flex, Stack, Text, Button, useColorMode, useToast, RadioGroup, Radio, 
Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, 
useDisclosure} from "@chakra-ui/react";
import { EditIcon, DeleteIcon  } from '@chakra-ui/icons';
import { Theme } from '../../store/colors.js';
import { useAuthStore } from "../../store/authStore.js";
import { useEffect, useState } from "react";

export const UsersPage = () => {
    const { colorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedRole, setSelectedRole] = useState('');  
    const [selectedUser, setSelectedUser] = useState(''); 
    const [selectedOp, setSelectedOp] = useState('');
    const toast = useToast();
    const currentUser = useAuthStore((state) => state.user);
    const allUsers = useAuthStore((state) => state.allUsers);
    const fetchUsers = useAuthStore((state) => state.fetchUsers);
    const updateUserRole = useAuthStore((state) => state.changeUserRole);
    const deleteUser = useAuthStore((state) => state.deleteUser);

    useEffect(() => {
        (
            async() => {
                const { success, message } = await fetchUsers();
                if(!success) {
                    toast({
                        title: "Error",
                        description: message,
                        status: "error",
                        isClosable: true
                    });
                    onClose();
                }
            }
        )();
    }, []);

    const displayToast = (success, message) => {
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true
            });
        }
        else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true
            });
        }
        onClose();
    }

    const handleChangeRole = async () => {
        const { success, message } = await updateUserRole(selectedUser, selectedRole);
        displayToast(success, message);
    }

    const handleDeleteUser = async () => {
        const { success, message } = await deleteUser(selectedUser);
        displayToast(success, message);
    }

    const filteredUsers = allUsers.filter((user) => user.userId !== currentUser.userId);

    return (
        <Container maxW={"container.sm"} py={12}>
            <Text my={5} fontSize={20} fontWeight={'bold'} textAlign={'center'}>Users Admin Dashboard</Text>
            <Flex flexDirection={'column'} margin={'auto'} gap={5}>
                {
                    filteredUsers
                    .map((user) => (
                        <Flex key={user.userId} maxW={{ base: 'sm', md: 'lg' }} borderRadius={10} bg={Theme[colorMode].inverseBackground} color={Theme[colorMode].black} alignItems={'center'} justifyContent={'space-between'}>
                            <Text>{user.username}</Text>
                            <Text>User ID</Text>
                            <Text>{user.role}</Text>
                            <Flex>
                                <Button onClick={() => { setSelectedOp('update'); setSelectedRole(user.role); setSelectedUser(user.userId); onOpen() }} rightIcon={<EditIcon />} color={Theme[colorMode].black}>Role</Button>
                                <Button onClick={() => { setSelectedOp('delete'); setSelectedUser(user.userId); onOpen() }} rightIcon={<DeleteIcon />} color={Theme[colorMode].black}>Delete</Button>
                            </Flex>
                        </Flex>
                    ))
                }
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{ selectedOp === 'update' ? 'Change User Role' : 'Delete User' }</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {
                                selectedOp === 'update'
                                ? (
                                    <RadioGroup onChange={setSelectedRole} value={selectedRole}>
                                        <Stack direction="column">
                                            <Radio value="admin">Admin</Radio>
                                            <Radio value="stockist">Stockist</Radio>
                                            <Radio value="user">User</Radio>
                                        </Stack>
                                    </RadioGroup>
                                )
                                : (
                                    <Text>Are you sure you want to delete this user?</Text>
                                )
                            }
                        </ModalBody>
                        <ModalFooter>
                            {
                                selectedOp === 'update'
                                ? (
                                    <Button onClick={() => handleChangeRole()} colorScheme="blue" mr={3}>
                                        Change Role 
                                    </Button>
                                )
                                : (
                                    <Button onClick={() => handleDeleteUser()} colorScheme="red" mr={3}>
                                        Delete User
                                    </Button>
                                )
                            }
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>
        </Container>
    );
}