import { Container, Button, Flex, HStack, Text, useColorMode, Avatar, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AmazoniaDrawer } from './Drawer';
import { Theme } from '../store/colors';
import { useAuthStore } from '../store/authStore';
import { MdInventory } from "react-icons/md";   

export const Navbar = () => {
    const { colorMode } = useColorMode();
    const user = useAuthStore((state) => state.user);
    return (
        <Container
            maxW={"1140px"}
            px={4}
            bgColor={Theme[colorMode].inverseBackground}
            borderRadius={"10px"}
            position={{
                base: 'fixed',
                md: 'sticky'
            }}
            zIndex={1000}
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
                    fontSize={{
                        base: '2xl',
                        md: '3xl'
                    }}
                    fontWeight='extrabold'
                >
                    <Link to={"/"}>Inventra
                        <Icon as={MdInventory} marginY={'auto'} color={'yellow.500'} ml={2} />
                    </Link>
                </Text>

                <HStack spacing={2} alignItems={"center"}>
                    { user
                    ? (<Avatar bg={Theme[colorMode].buttonBackground} color={Theme[colorMode].white} size={'sm'} name={user?.username} />) 
                    : (
                        <Link to="/login">
                            <Button bg={Theme[colorMode].buttonBackground} color={Theme[colorMode].white}>Login</Button>
                        </Link>
                    )}

                    <AmazoniaDrawer />
                </HStack>
            </Flex>
        </Container>
    );
}