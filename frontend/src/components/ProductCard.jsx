import { Box, Heading, HStack, IconButton, Image, Modal, useDisclosure, ModalBody, ModalCloseButton, 
ModalContent, ModalHeader, ModalOverlay, Text, ModalFooter, Button, useColorMode,
useToast} from "@chakra-ui/react";
import { EditIcon, DeleteIcon  } from '@chakra-ui/icons';
import { useProductStore } from "../store/productStore";
import { useState } from "react";
import { ProductForm } from "./ProductForm";
import { useAuthStore } from "../store/authStore";
import { Theme } from "../store/colors";
import { StockForm } from "./StockForm";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const [selectedOp, setSelectedOp] = useState('');
    const { colorMode } = useColorMode();
    const toast = useToast();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const user = useAuthStore((state) => state.user);
    const logoutUser = useAuthStore((state) => state.logout);
    const { deleteProduct, updateProduct, updateStock } = useProductStore();

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

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        displayToast(success, message);
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
        setUpdatedProduct((updatedProduct) => ({...updatedProduct, updatedBy: user?.userId}));
        const { success, message } = await updateProduct(pid, updatedProduct);
        displayToast(success, message);
        onClose();
    }

    const handleUpdateStock = async (pid, updatedProduct) => {
        setUpdatedProduct((updatedProduct) => ({...updatedProduct, updatedBy: user?.userId}));
        const { success, message } = await updateStock(pid, updatedProduct);
        displayToast(success, message);
        onClose();
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
                        <IconButton icon={<EditIcon />} onClick={() => { setSelectedOp('update'); onOpen() }} colorScheme={"blue"} />
                        <IconButton icon={<DeleteIcon />} onClick={() => { setSelectedOp('delete'); onOpen() }} colorScheme={"red"} />
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
                    <ModalHeader>
                        {
                            user?.role === 'stockist' 
                            ? 'Update Stock' 
                            : selectedOp === 'delete' ? 'Delete Product' : 'Update Product'
                        }
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {user?.role === 'stockist' 
                        ? (
                            <StockForm newProduct={updatedProduct} setNewProduct={setUpdatedProduct} />
                        )
                        : (
                            selectedOp === 'delete' ? <Text>Are you sure you want to delete this product? </Text> : <ProductForm newProduct={updatedProduct} setNewProduct={setUpdatedProduct} />
                        )}
                        
                    </ModalBody>
                    <ModalFooter>
                        {user?.role === 'stockist'
                        ? (
                            <Button mr={4} colorScheme={"blue"} onClick={() => handleUpdateStock(product._id, updatedProduct)}>Update</Button>
                        )
                        : (
                            selectedOp === 'delete' ? <Button mr={4} colorScheme={"red"} onClick={() => handleDeleteProduct(product._id)}>Delete</Button> : <Button mr={4} colorScheme={"blue"} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
                        )}
                        <Button onClick={handleCancel}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default ProductCard;