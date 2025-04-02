import { Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { ProductForm } from "../ProductForm";

export const ProductModal = ({ isOpen, onClose, productSettings }) => {
    const { selectedOp, product, updatedProduct, setUpdatedProduct, handleUpdateProduct, handleDeleteProduct, handleCancel } = productSettings;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{ selectedOp === 'update' ? 'Update Product' : 'Delete Product' }</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {
                        selectedOp === 'update'
                        ? (
                            <ProductForm newProduct={updatedProduct} setNewProduct={setUpdatedProduct} />
                        )
                        : (
                            <Text>Are you sure you want to delete this product?</Text>
                        )
                    }
                </ModalBody>
                <ModalFooter>
                    {
                        selectedOp === 'update'
                        ? (
                            <Button onClick={() => handleUpdateProduct(product._id, updatedProduct)} colorScheme="blue" mr={3}>
                                Update 
                            </Button>
                        )
                        : (
                            <Button onClick={() => handleDeleteProduct(product._id)} colorScheme="red" mr={3}>
                                Delete
                            </Button>
                        )
                    }
                    <Button onClick={() => handleCancel()}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}