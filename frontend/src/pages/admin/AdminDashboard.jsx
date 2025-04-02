import { Box, Container, Flex, Text, useColorMode, useDisclosure, useToast } from "@chakra-ui/react";
import { Theme } from "../../store/colors";
import { Link, useNavigate } from "react-router-dom";
import { useProductStore } from "../../store/productStore";
import { useAuthStore } from "../../store/authStore";
import { useEffect } from "react";

export const AdminDashboard = () => {
    const { colorMode } = useColorMode();
    const { onClose } = useDisclosure();
    const productsCount = useProductStore((state) => state.products);
    const adminUser = useAuthStore((state) => state.user);
    const logoutUser = useAuthStore((state) => state.logout);
    const fetchUsers = useAuthStore((state) => state.fetchUsers);
    const navigate = useNavigate();
    const toast = useToast();

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
                    if (message === "Access Token is expired! Please log in") {
                        logoutUser();
                        navigate('/login');
                    }
                }
            }
        )();
    }, []);

    const dashboardOptions = [
        {
            id: 1,
            name: "Products",
            href: 'products/'
        },
        {
            id: 2,
            name: "Users",
            href: 'users/'
        }
    ]

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    }

    return (
        <Container maxW={"container.sm"} py={12}>
            <Text my={5} textAlign={'center'} fontSize={20} fontWeight={'bold'}>{greeting()}, {adminUser.username}</Text>
            <Flex height={100} width={{ base: 'xs', md: 'md' }} margin={'auto'} mb={5} borderRadius={10} bg={Theme[colorMode].inverseBackground} flexDirection={{ base: 'column', md: 'row' }} justifyContent={'center'} alignItems={'center'} gap={5}>
                <Text color={Theme[colorMode].inverseText} fontSize={20} fontWeight={'bold'} textAlign={'center'}>Inventory Count: {productsCount.length}</Text>
                <Text color={Theme[colorMode].inverseText} fontSize={20} fontWeight={'bold'} textAlign={'center'}>Inventory Worth: KES {productsCount.reduce((sum, el) => sum + el.price, 0)}</Text>
            </Flex>
            <Flex flexDirection={{ base: 'column', md: 'row' }} margin={'auto'} gap={5}>
                {
                    dashboardOptions.map(el => (
                        <Link key={el.id} to={el.href}>
                            <Box maxW={'sm'} height={250} width={250} margin={'auto'} borderRadius={10} bg={Theme[colorMode].inverseBackground}>
                                <Text color={Theme[colorMode].inverseText} textAlign={'center'}>{el.name}</Text>
                            </Box>
                        </Link>
                    ))
                }
            </Flex>
        </Container>
    );
}