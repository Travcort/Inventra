import { useState } from "react";
import { Box, Heading, HStack, IconButton, Image, useDisclosure, Text, useColorMode, Flex, Container, useToast} from "@chakra-ui/react";
import { EditIcon, DeleteIcon  } from '@chakra-ui/icons';
import { Theme } from "../../store/colors";
import { useProductStore } from "../../store/productStore";
import { useAuthStore } from "../../store/authStore";
import { ProductModal } from "./ProductModal";
import { useNavigate } from "react-router-dom";

export const AdminProductCard = ({ product }) => {
    const toast = useToast();
    const navigate = useNavigate();
    const [selectedOp, setSelectedOp] = useState('');
    const { colorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const { deleteProduct, updateProduct } = useProductStore();
    const user = useAuthStore((state) => state.user);
    const allUsers = useAuthStore((state) => state.allUsers);
    const logoutUser = useAuthStore((state) => state.logout);

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
        onClose();
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
        setUpdatedProduct((updatedProduct) => ({...updatedProduct, updatedBy: user?.userId}));
        const { success, message } = await updateProduct(pid, updatedProduct);
        displayToast(success, message);
        onClose();
    }

    const handleCancel = () => {
        setUpdatedProduct(product);
        onClose();
    }

    return (
        <Container w={'full'} bg={Theme[colorMode].cardBackground} rounded={"lg"} shadow={"lg"} overflow={"hidden"} transition={"all .3s"} >
            <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />

            <Box p={4}>
                <Heading as={"h3"} size={"md"} mb={2} color={Theme[colorMode].inverseText}>{ product.name }</Heading>
                <Text fontWeight={"semibold"} fontSize={"md"} mb={4} color={Theme[colorMode].inverseText} >{ product.description }</Text>
                <Flex flexDirection={'row'} gap={3}>
                    <Flex flexDirection={'column'}>
                        <Text fontWeight={"semibold"} fontSize={"xl"} mb={4} color={Theme[colorMode].inverseText} >Price: { product.price }</Text>
                        <Text fontWeight={"semibold"} fontSize={"xl"} mb={4} color={Theme[colorMode].inverseText} >Stock: { product.stock }</Text>
                    </Flex>
                    <Flex flexDirection={'column'}>
                        <Text fontWeight={"semibold"} fontSize={"xl"} mb={4} color={Theme[colorMode].inverseText} >
                            Created By: { allUsers.find(user => user.userId === product.createdBy)?.username || 'Admin' }
                        </Text>
                        <Text fontWeight={"semibold"} fontSize={"xl"} mb={4} color={Theme[colorMode].inverseText} >
                            Last Updated By: { allUsers.find(user => user.userId === product.updatedBy)?.username || 'Admin' }
                        </Text>
                    </Flex>
                </Flex>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={() => { setSelectedOp('update'); onOpen() }} colorScheme={"blue"} />
                    <IconButton icon={<DeleteIcon />} onClick={() => { setSelectedOp('delete'); onOpen() }} colorScheme={"red"} />
                </HStack>
            </Box>

            <ProductModal 
                isOpen={isOpen} onClose={onClose} 
                productSettings={{ product, selectedOp, updatedProduct, setUpdatedProduct, handleUpdateProduct, handleDeleteProduct, handleCancel }} 
            />
        </Container>
    );
}