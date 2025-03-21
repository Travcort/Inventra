import { useToast, Input, Text, Button, useColorMode, Flex, VStack, Container, FormControl, FormLabel } from "@chakra-ui/react";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { Theme } from "../store/colors";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const { colorMode } = useColorMode();

    const toast = useToast();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (!data.success) {
                toast({
                    title: "Error",
                    description: data.message,
                    status: "error",
                    isClosable: true
                });
                if(data.message === "Invalid Password!") {
                    setPassword("");
                }
                else {
                    setEmail("");
                    setPassword("");
                }
            }
            else {
                login(data.token, data.user?.username, data.user?.userId, data.user?.role);
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container maxW={'container.xl'} py={12}>
            <VStack mt={5} spacing={8}>
                <Text align={'center'} fontSize={20} fontWeight={'extrabold'} paddingY={2}>Login Page</Text>
                <form onSubmit={handleLogin}>
                    <Flex margin={'auto'} maxW={'sm'} flexDirection={'column'}>
                        <FormControl w={'full'} isRequired>
                            <FormLabel fontWeight="bold">Email</FormLabel>
                            <Input mb={2} type="email" placeholder="example@randommail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </FormControl>
                        <FormControl w={'full'} isRequired>
                            <FormLabel fontWeight="bold">Password</FormLabel>
                            <Input mb={2} type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </FormControl>
                        <Button bg={Theme[colorMode].buttonBackground} color={Theme[colorMode].white} type="submit">Login</Button>
                        <Link to={'/register'}>
                            <Button w={'full'} mt={5} bg={Theme[colorMode].buttonBackground} color={Theme[colorMode].white}>Sign Up</Button></Link>
                        </Flex>
                </form>
            </VStack>
        </Container>
    );
}