import { useState } from "react";
import { Container, Heading, VStack, Box, useColorModeValue, Button, useToast } from "@chakra-ui/react";
import { useProductStore } from "../store/productStore"
import { Theme } from "../store/colors";
import { ProductForm } from "../components/ProductForm";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
    const toast = useToast();
    const user = useAuthStore((state) => state.user);
    const logoutUser = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const [ newProduct, setNewProduct ] = useState({
        name: "",
        price: "",
        description: "",
        stock: "",
        image: "",
        createdBy: user?.userId
    });

    const displayToast = (success, message) => {
        if (message === "Access Token is expired! Please log in") {
            logoutUser();
            navigate('/login');
        }
        
        toast({
            title: success ? "Success" : "Error",
            description: message,
            status: success ? 'success' : 'error',
            isClosable: true,
        })
    }

    const createProduct= useProductStore((state) => state.createProduct);

    const handleAddProduct = async() => {
        const { success, message } = await createProduct(newProduct);
        setNewProduct({ name: "", price: "", description: "", stock: "", image: "" });
        navigate('/');
        displayToast(success, message);
    }

    return (
        <Container maxW={"container.sm"} py={12}>
            <VStack mt={5} spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Create a New Product</Heading>

                <Box w={"full"} bg={useColorModeValue(Theme.backgroundColor)}>
                    <ProductForm newProduct={newProduct} setNewProduct={setNewProduct} />
                    <Button mt={5} colorScheme={"blue"} w={"full"} onClick={handleAddProduct}>Add Product</Button>
                </Box>
            </VStack>
        </Container>
    );
};

export default CreatePage;