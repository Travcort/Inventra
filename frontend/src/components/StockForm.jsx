import { Input, Text, VStack } from "@chakra-ui/react";

export const StockForm = ({ newProduct, setNewProduct }) => {
    return (
        <VStack>
            <Text w={'full'}>Stock
                <Input mt={4}
                    placeholder={'Stock'}
                    name={'stock'}
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                />
            </Text>
        </VStack>
    );
}