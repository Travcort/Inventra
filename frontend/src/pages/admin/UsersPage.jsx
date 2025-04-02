import { Container, Flex, Text, Button, Avatar, useToast, useDisclosure, useColorMode, Table, Thead, Tr, Td, Th, Tbody, TableContainer} from "@chakra-ui/react";
import { EditIcon, DeleteIcon  } from '@chakra-ui/icons';
import { useAuthStore } from "../../store/authStore.js";
import { useState } from "react";
import { UserModal } from "../../components/admin/UserModal.jsx";
import { Theme } from "../../store/colors.js";

export const UsersPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode } = useColorMode();
    const [selectedRole, setSelectedRole] = useState('');  
    const [selectedUser, setSelectedUser] = useState(''); 
    const [selectedOp, setSelectedOp] = useState('');
    const toast = useToast();
    const currentUser = useAuthStore((state) => state.user);
    const allUsers = useAuthStore((state) => state.allUsers);  
    const updateUserRole = useAuthStore((state) => state.changeUserRole);
    const deleteUser = useAuthStore((state) => state.deleteUser);

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
                <TableContainer maxWidth={'100%'} margin={'auto'} borderRadius={10} bg={Theme[colorMode].inverseBackground}>
                    <Table variant={'simple'} color={Theme[colorMode].inverseText}>
                        <Thead>
                            <Tr>
                                <Th>User</Th>
                                <Th>User Email</Th>
                                <Th>User Role</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {
                            filteredUsers
                            .map((user) => (
                                <Tr key={user.userId}>
                                    <Td>
                                        <Flex alignItems={'center'} gap={3}>
                                            <Avatar bg={Theme[colorMode].buttonBackground} color={Theme[colorMode].white} size={'md'} name={user?.username} />
                                            {user.username}
                                        </Flex>
                                    </Td>
                                    <Td>{user.email}</Td>
                                    <Td>{user.role}</Td>
                                    <Td>
                                        <Flex flexDirection={{ base: 'column', md: 'row' }} gap={3}>
                                            <Button onClick={() => { setSelectedOp('update'); setSelectedRole(user.role); setSelectedUser(user.userId); onOpen() }} rightIcon={<EditIcon />} color={Theme[colorMode].black}>Role</Button>
                                            <Button onClick={() => { setSelectedOp('delete'); setSelectedUser(user.userId); onOpen() }} rightIcon={<DeleteIcon />} color={Theme[colorMode].black}>Delete</Button>
                                        </Flex>
                                    </Td>
                                </Tr>
                            ))
                        }
                        </Tbody>
                    </Table>
                </TableContainer>
                <UserModal isOpen={isOpen} onClose={onClose} userSettings={{ selectedOp, selectedRole, setSelectedRole, handleChangeRole, handleDeleteUser }} />
            </Flex>
        </Container>
    );
}