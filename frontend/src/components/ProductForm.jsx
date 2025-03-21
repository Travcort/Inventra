import { FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";

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
                    <FormControl key={el.id} isRequired>
                        <FormLabel>{el.placeholder}</FormLabel>
                        <Input
                            placeholder={el.placeholder}
                            name={el.property}
                            value={newProduct[el.property]}
                            onChange={(e) => setNewProduct({ ...newProduct, [el.property]: e.target.value })}
                        />
                    </FormControl>
                ))
            }
        </VStack>
    );
}