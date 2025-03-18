import { Spinner, Container, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import { useProductStore } from '../store/product';
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
            <VStack spacing={8}>

                <Text textAlign={'center'} fontSize={"30"} fontWeight={"bold"}>
                    Current Products
                </Text>

                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3
                    }}
                    spacing={10}
                    w={"full"}
                >
                    { isLoading ? <Spinner margin={'auto'} speed='0.65s' thickness='2px' emptyColor='gray.200' color='purple.500' size='xl' /> : <ProductsSection products={currentProducts} /> }
                </SimpleGrid>
                
            </VStack>
        </Container>
    );
};

export default HomePage;