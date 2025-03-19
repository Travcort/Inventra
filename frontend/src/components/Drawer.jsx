import { Button, IconButton, DrawerBody, Drawer, DrawerFooter, DrawerHeader, 
DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, useColorMode, Flex } from '@chakra-ui/react';
import React from 'react';
import { IoListSharp, IoSunny } from "react-icons/io5";
import { FaLinkedin, FaGithub, FaMoon, FaPowerOff } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Theme } from '../store/colors';
import { useAuthStore } from '../store/authStore';

export function AmazoniaDrawer() {
    const { isOpen, onOpen, onClose, getButtonProps } = useDisclosure();
    const buttonProps = getButtonProps();
    const btnRef = React.useRef();
    const { colorMode, toggleColorMode } = useColorMode();
    const logoutAction = useAuthStore((state) => state.logout);

    const handleLogout = () => {
      logoutAction();
      setTimeout(() => {
        onClose();
      }, 200);
    }
  
    return (
      <>
        <Button ref={btnRef} bg={Theme[colorMode].buttonBackground} color={Theme[colorMode].white} onClick={onOpen}>
            <IoListSharp />
        </Button>
        <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerHeader textAlign={'center'} color={'yellow.500'} fontSize={{ base: '2xl', md: '3xl' }}>Inventra</DrawerHeader>
  
            <DrawerBody>
              <Flex flexDirection={'column'} gap={5}>
                <Link to={'/create'}>
                    <Button bg={Theme[colorMode].buttonBackground} color={Theme[colorMode].white} {...buttonProps}>Add Product</Button>
                </Link>

                <Link to={'/login'}>
                    <Button bg={Theme[colorMode].buttonBackground} color={Theme[colorMode].white} {...buttonProps}>Login</Button>
                </Link>

                <Button color={Theme[colorMode].white} bg={Theme[colorMode].buttonBackground} onClick={toggleColorMode}>
                    {colorMode === 'light' ? <FaMoon /> : <IoSunny />}
                </Button>
              </Flex>
            </DrawerBody>
  
            <DrawerFooter>
                
                <Flex gap={4} width={'100%'} justifyContent={'center'}>
                    <a href='https://www.linkedin.com/in/tarvone/' target='blank'>
                        <IconButton color={Theme[colorMode].white} bg={Theme[colorMode].buttonBackground} icon={<FaLinkedin />} />
                    </a>
                    <a href='https://github.com/Travcort/' target='blank'>
                      <IconButton color={Theme[colorMode].white} bg={Theme[colorMode].buttonBackground} icon={<FaGithub />} />
                    </a>
                </Flex>

                <Button rightIcon={<FaPowerOff />} onClick={handleLogout}
                  color={Theme[colorMode].white} bg={Theme[colorMode].buttonBackground}
                >
                  Logout
                </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
}