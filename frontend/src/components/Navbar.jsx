import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { AmazoniaDrawer } from './Drawer';
import { Theme } from '../store/colors';

export const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Container
            maxW={"1140px"}
            px={4} 
            bgColor={Theme[colorMode].inverseBackground}
            borderRadius={"10px"}
        >
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={"row"}
            >
                <Text
                    bgColor={"yellow.500"}
                    bgClip='text'
                    fontSize='3xl'
                    fontWeight='extrabold'
                >
                    <Link to={"/"}>Amazonia 🛒</Link>
                </Text>

                <HStack spacing={2} alignItems={"center"}>
                    <Button colorScheme={Theme[colorMode].buttonBackground} onClick={toggleColorMode}>
                        {colorMode === 'light' ? <FaMoon /> : <IoSunny />}
                    </Button>

                    <AmazoniaDrawer />
                </HStack>
            </Flex>
        </Container>
    );
}