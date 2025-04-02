import { Container, Flex, Text } from '@chakra-ui/react';
import { useProductStore } from '../store/productStore';
import { useEffect } from 'react';
import { ProductsSection } from '../components/ProductsSection';

const HomePage = () => {
    const isLoading = useProductStore((state) => state.isLoading);
    const getProducts = useProductStore((state) => state.fetchProducts);
    const currentProducts = useProductStore((state) => state.products);
    
    useEffect(() => {
        getProducts();
    }, []);

    return (
        <Container maxW={'container.xl'} py={12}>
            <Flex flexDirection={'column'} mt={5} spacing={8}>
                <Text textAlign={'center'} fontSize={"30"} fontWeight={"bold"}>Current Products</Text>
                <ProductsSection isLoading={isLoading} products={currentProducts} />  
            </Flex>
        </Container>
    );
};

export default HomePage;