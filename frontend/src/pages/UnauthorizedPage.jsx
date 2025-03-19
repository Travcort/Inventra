import { Container, Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <Container maxW={'container.xl'} py={12}>
      <Flex flexDirection={'column'} mt={5} spacing={8}>
        <Text textAlign={'center'} fontSize={"30"} fontWeight={"bold"}>Access Denied</Text>
        <Text textAlign={'center'}>You do not have permission to view this page.</Text>
        <Link to="/">
          <Text textAlign={'center'} color={'blue'}>Go Back Home</Text>
        </Link>
      </Flex>
    </Container>
  );
};

export default Unauthorized;