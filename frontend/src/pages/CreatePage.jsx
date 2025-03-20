import { useState } from "react";
import { Container, Heading, VStack, Box, useColorModeValue, Button, useToast } from "@chakra-ui/react";
import { useProductStore } from "../store/productStore"
import { Theme } from "../store/colors";
import { ProductForm } from "../components/ProductForm";
import { useAuthStore } from "../store/authStore";

const CreatePage = () => {
    const [ newProduct, setNewProduct ] = useState({
        name: "",
        price: "",
        description: "",
        stock: "",
        image: "",
        createdBy: useAuthStore.getState().user.userId
    });

    const createProduct= useProductStore((state) => state.createProduct);
    const toast = useToast();

    const handleAddProduct = async() => {
        const { success, message } = await createProduct(newProduct);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true
            });
        }
        else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true
            });
        }
        setNewProduct({ name: "", price: "", description: "", stock: "", image: "" });
    }

    return <Container maxW={"container.sm"}>
        <VStack mt={5} spacing={8}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Create a New Product</Heading>

            <Box w={"full"} bg={useColorModeValue(Theme.backgroundColor)}>
                <ProductForm newProduct={newProduct} setNewProduct={setNewProduct} />
                <Button colorScheme={"blue"} w={"full"} onClick={handleAddProduct}>Add Product</Button>
            </Box>
        </VStack>
    </Container>
};

export default CreatePage;