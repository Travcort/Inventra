import { Button, IconButton, DrawerBody, Drawer, DrawerFooter, DrawerHeader, 
DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Flex } from '@chakra-ui/react';
import React from 'react';
import { IoListSharp } from "react-icons/io5";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';

export function AmazoniaDrawer() {
    const { isOpen, onOpen, onClose, getButtonProps } = useDisclosure();
    const buttonProps = getButtonProps();
    const btnRef = React.useRef();
  
    return (
      <>
        <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
            <IoListSharp />
        </Button>
        <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerHeader textAlign={'center'}>Amazonia</DrawerHeader>
  
            <DrawerBody>
              <Flex>
                <Link to={'/create'}>
                    <Button {...buttonProps}>Add Product</Button>
                </Link>
              </Flex>
            </DrawerBody>
  
            <DrawerFooter>
                <Flex gap={4} width={'100%'} justifyContent={'center'}>
                    <Link target='blank' >
                        <IconButton icon={<FaLinkedin />} />
                    </Link>
                    <IconButton icon={<FaGithub />} />
                </Flex>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
}