import { Link } from 'react-router-dom';
import { Text, Spinner, SimpleGrid, Flex } from '@chakra-ui/react';
import { AdminProductCard } from './AdminProductCard';

export const AdminProductsSection = ({ isLoading, products }) => {
    return (
        isLoading 
        ? <Spinner margin={'auto'} speed='0.65s' thickness='2px' emptyColor='gray.200' color='purple.500' size='xl' /> 
        : products.length > 0
            ? (
                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3
                    }}
                    spacing={10}
                    w={"full"}
                    margin={'auto'}
                >
                    {
                        products.map((product) => (
                            <AdminProductCard key={product._id} product={product} />
                        ))
                    }
                </SimpleGrid>
            )
            : (
                <Flex margin={'auto'} flexDirection={{ base: 'column', md: 'row' }}>
                    <Text fontSize={'xl'} textAlign={'center'} fontWeight={"bold"} color={"gray.500"}>
                        No Products Found {" "}
                        <Link to={"/create"}>
                            <Text as={'span'} color={'blue.500'}>Create a Product</Text>
                        </Link>
                    </Text>
                </Flex>
            )  
    );
}