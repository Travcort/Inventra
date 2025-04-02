import { Input, Text, Button, useColorMode, Flex, VStack, Container, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Theme } from "../store/colors";
import { useAuthStore } from "../store/authStore";

export const RegisterPage = () => {
    const { colorMode } = useColorMode();
    const toast = useToast();
    const signUp = useAuthStore((state) => state.register);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        const { success, message } = await signUp(username, email, password);
        if (!success) {
            setEmail("");
            setPassword("");
            setUsername("");
            toast({
                title: "Error",
                description: message,
                status: 'error',
                isClosable: true,
            })
        }
        else {
            toast({
                title: "Success",
                description: message,
                status: 'success',
                isClosable: true,
            })
            navigate('/login');
        }
    }

    return (
        <Container maxW={'container.xl'} py={12}>
            <VStack mt={5} spacing={8}>
                <Text align={'center'} fontSize={20} fontWeight={'extrabold'} paddingY={2}>Sign Up</Text>
                <form onSubmit={handleSignUp}>
                    <Flex margin={'auto'} w={'100%'} flexDirection={'column'}>
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
                        <Button mt={5} bg={Theme[colorMode].buttonBackground} color={Theme[colorMode].white} type="submit">Sign Up</Button>
                    </Flex>
                </form>
            </VStack>
        </Container>
    );
}