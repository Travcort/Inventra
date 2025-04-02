import { Container, Flex, Text } from "@chakra-ui/react";
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
            <Text my={5} fontSize={30} fontWeight={'bold'} textAlign={'center'}>Products Admin Dashboard</Text>
            <Flex flexDirection={'column'} margin={'auto'} gap={5}>
                <AdminProductsSection isLoading={isLoading} products={currentProducts} />
            </Flex>
        </Container>
    );
}