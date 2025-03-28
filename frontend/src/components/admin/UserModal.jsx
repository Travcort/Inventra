import { Stack, Text, Button, RadioGroup, Radio, 
Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";

export const UserModal = ({ isOpen, onClose, userSettings }) => {
    const { selectedOp, selectedRole, setSelectedRole, handleChangeRole, handleDeleteUser } = userSettings;

    return (
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
    );
}