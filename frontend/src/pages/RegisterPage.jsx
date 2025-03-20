import { useToast, Input, Text, Button, useColorMode, Flex, VStack, Container, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Theme } from "../store/colors";

export const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const { colorMode } = useColorMode();

    const toast = useToast();

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password, role })
            });
            const data = await response.json();
            if (!data.success) {
                toast({
                    title: "Error",
                    description: data.message,
                    status: "error",
                    isClosable: true
                });
            }
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container maxW={'container.xl'} py={12}>
            <VStack mt={5} spacing={8}>
                <Text align={'center'} fontSize={20} fontWeight={'extrabold'} paddingY={2}>Sign Up</Text>
                <form onSubmit={handleSignUp}>
                    <Flex margin={'auto'} w={'100%'} maxW={'sm'} flexDirection={'column'}>
                        <FormControl w={'full'} isRequired>
                            <FormLabel fontWeight="bold">Username</FormLabel>
                            <Input mb={2} type="text" placeholder="Procrastinator" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </FormControl>
                        <FormControl w={'full'} isRequired>
                            <FormLabel fontWeight="bold">Email</FormLabel>
                            <Input mb={2} type="email" placeholder="example@randommail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </FormControl>
                        <FormControl w={'full'} isRequired>
                            <FormLabel fontWeight="bold">Password</FormLabel>
                            <Input mb={2} type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </FormControl>
                        <FormControl w="full" isRequired>
                            <FormLabel fontWeight="bold">Role</FormLabel>
                            <Select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="">Select a Role</option>
                                <option value="admin">Admin</option>
                                <option value="stockist">Stockist</option>
                                <option value="user">User</option>
                            </Select>
                        </FormControl>
                        <Button bg={Theme[colorMode].buttonBackground} color={Theme[colorMode].white} type="submit">Sign Up</Button>
                    </Flex>
                </form>
            </VStack>
        </Container>
    );
}