import { Box, Heading, HStack, IconButton, Image, Modal, useDisclosure, ModalBody, ModalCloseButton, 
ModalContent, ModalHeader, ModalOverlay, Text, useColorModeValue, useToast, ModalFooter, Button } from "@chakra-ui/react";
import { EditIcon, DeleteIcon  } from '@chakra-ui/icons';
import { useProductStore } from "../store/product";
import { useState } from "react";
import { ProductForm } from "./ProductForm";

const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textColour = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();
    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: 'error',
                isClosable: true,
            });
        }
        else {
            toast({
                title: "Success",
                description: message,
                status: 'success',
                isClosable: true,
            });
        }
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        onClose();
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: 'error',
                isClosable: true,
            });
        }
        else {
            toast({
                title: "Success",
                description: message,
                status: 'success',
                isClosable: true,
            });
        }
    }

    const handleCancel = () => {
        onClose();
        setUpdatedProduct(product);
    }

    return (
        <Box bg={bg} rounded={"lg"} shadow={"lg"} overflow={"hidden"} transition={"all .3s"} >
            <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />

            <Box p={4}>
                <Heading as={"h3"} size={"md"} mb={2}>{ product.name }</Heading>
                <Text fontWeight={"bold"} fontSize={"xl"} mb={4} color={textColour} >{ product.price }</Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme={"blue"} />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme={"red"} />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ProductForm newProduct={updatedProduct} setNewProduct={setUpdatedProduct} />
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={4} colorScheme={"blue"} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
                        <Button colorScheme={"red"} onClick={handleCancel}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default ProductCard;