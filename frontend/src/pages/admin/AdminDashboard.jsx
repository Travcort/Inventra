import { Box, Container, Flex, Text, useColorMode } from "@chakra-ui/react";
import { Theme } from "../../store/colors";
import { Link } from "react-router-dom";

export const AdminDashboard = () => {
    const { colorMode } = useColorMode();

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

    return (
        <Container maxW={"container.sm"} py={12}>
            <Text my={5} fontSize={20} fontWeight={'bold'} textAlign={'center'}>Admin Dashboard</Text>
            <Flex flexDirection={{ base: 'column', md: 'row' }} gap={5}>
                {
                    dashboardOptions.map(el => (
                        <Link key={el.id} to={el.href}>
                            <Box maxW={'sm'} height={250} width={250} margin={'auto'} borderRadius={15} bg={Theme[colorMode].inverseBackground}>
                                <Text color={'black'}>{el.name}</Text>
                            </Box>
                        </Link>
                    ))
                }
            </Flex>
        </Container>
    );
}