import { Input, Text, VStack } from "@chakra-ui/react";

export const ProductForm = ({ newProduct, setNewProduct }) => {

    const inputData = [
        {
            id: 1,
            placeholder: "Product Name",
            property: "name",
        },
        {
            id: 2,
            placeholder: "Price",
            property: "price",
        },
        {
            id: 3,
            placeholder: "Description",
            property: "description",
        },
        {
            id: 4,
            placeholder: "Stock",
            property: "stock",
        },
        {
            id: 5,
            placeholder: "Image URL",
            property: "image",
        }
    ]

    return (
        <VStack>
            {
                inputData.map(el => (
                    <Text key={el.id} w={'full'}>{el.placeholder}
                        <Input mt={4}
                            placeholder={el.placeholder}
                            name={el.property}
                            value={newProduct[el.property]}
                            onChange={(e) => setNewProduct({ ...newProduct, [el.property]: e.target.value })}
                        />
                    </Text>
                ))
            }
        </VStack>
    );
}