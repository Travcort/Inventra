import { Container, Flex, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { AdminProductsSection } from "../../components/admin/AdminProductsSection";
import { useProductStore } from "../../store/productStore";
import { useEffect } from "react";

export const ProductsPage = () => {
    const isLoading = useProductStore((state) => state.isLoading);
    const getProducts = useProductStore((state) => state.fetchProducts);
    const currentProducts = useProductStore((state) => state.products);

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <Container maxW={"container.xl"} py={12}>
            <Text my={5} fontSize={20} fontWeight={'bold'} textAlign={'center'}>Products Admin Dashboard</Text>
            <Flex flexDirection={'column'} margin={'auto'} gap={5}>
                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3
                    }}
                    spacing={10}
                    w={"full"}
                >
                    { isLoading ? <Spinner margin={'auto'} speed='0.65s' thickness='2px' emptyColor='gray.200' color='purple.500' size='xl' /> : <AdminProductsSection products={currentProducts} /> }
                </SimpleGrid>
            </Flex>
        </Container>
    );
}