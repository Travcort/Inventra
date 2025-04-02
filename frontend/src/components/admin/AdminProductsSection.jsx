import { Link } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
import { AdminProductCard } from './AdminProductCard';

export const AdminProductsSection = ({ products }) => {
    return (
        products
        ? (
            products.map((product) => (
                <AdminProductCard key={product._id} product={product} />
            ))
        ) 
        : (
            <Text fontSize={'xl'} textAlign={'center'} fontWeight={"bold"} color={"gray.500"}>
                No Products Found {" "}
                <Link to={"/create"}>
                    <Text as={'span'} color={'blue.500'}>Create a Product</Text>
                </Link>
            </Text>
        )
        
    );
}