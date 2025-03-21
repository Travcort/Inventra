import { Box, Heading, HStack, IconButton, Image, Modal, useDisclosure, ModalBody, ModalCloseButton, 
ModalContent, ModalHeader, ModalOverlay, Text, useToast, ModalFooter, Button,
useColorMode} from "@chakra-ui/react";
import { EditIcon, DeleteIcon  } from '@chakra-ui/icons';
import { useProductStore } from "../store/productStore";
import { useState } from "react";
import { ProductForm } from "./ProductForm";
import { useAuthStore } from "../store/authStore";
import { Theme } from "../store/colors";
import { StockForm } from "./StockForm";

const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const { colorMode } = useColorMode();

    const user = useAuthStore((state) => state.user);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { deleteProduct, updateProduct, updateStock } = useProductStore();
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
        setUpdatedProduct((updatedProduct) => ({...updatedProduct, updatedBy: user?.userId}));
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

    const handleUpdateStock = async (pid, updatedProduct) => {
        setUpdatedProduct((updatedProduct) => ({...updatedProduct, updatedBy: user?.userId}));
        const { success, message } = await updateStock(pid, updatedProduct);
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
        <Box bg={Theme[colorMode].cardBackground} rounded={"lg"} shadow={"lg"} overflow={"hidden"} transition={"all .3s"} >
            <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />

            <Box p={4}>
                <Heading as={"h3"} size={"md"} mb={2} color={Theme[colorMode].inverseText}>{ product.name }</Heading>
                <Text fontWeight={"semibold"} fontSize={"md"} mb={4} color={Theme[colorMode].inverseText} >{ product.description }</Text>
                <Text fontWeight={"semibold"} fontSize={"xl"} mb={4} color={Theme[colorMode].inverseText} >Price: { product.price }</Text>
                <Text fontWeight={"semibold"} fontSize={"xl"} mb={4} color={Theme[colorMode].inverseText} >Stock: { product.stock }</Text>
                {user?.role === 'admin' && (
                    <HStack spacing={2}>
                        <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme={"blue"} />
                        <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme={"red"} />
                    </HStack>
                )}

                {user?.role === 'stockist' && (
                    <HStack spacing={2}>
                        <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme={"blue"} />
                    </HStack>
                )}
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update {user?.role === 'stockist' ? 'Stock' : 'Product'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {user?.role === 'stockist' 
                        ? (
                            <StockForm newProduct={updatedProduct} setNewProduct={setUpdatedProduct} />
                        )
                        : (
                            <ProductForm newProduct={updatedProduct} setNewProduct={setUpdatedProduct} />
                        )}
                        
                    </ModalBody>
                    <ModalFooter>
                        {user?.role === 'stockist'
                        ? (
                            <Button mr={4} colorScheme={"blue"} onClick={() => handleUpdateStock(product._id, updatedProduct)}>Update</Button>
                        )
                        : (
                            <Button mr={4} colorScheme={"blue"} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
                        )}
                        <Button colorScheme={"red"} onClick={handleCancel}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default ProductCard;