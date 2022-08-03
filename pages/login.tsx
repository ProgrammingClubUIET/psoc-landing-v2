import { Flex, HStack, VStack, Image, Text, Center, Heading, FormControl, FormLabel, Input, Box, Button, Divider } from "@chakra-ui/react";
import { NextPage } from "next";
import LoginForm from "../components/LoginForm";

const Login: NextPage = () => {

    return (
        <Flex width="full" bg="blue.400" height="100vh" justifyContent="center">
            <HStack my="8vh" mx="4vw" height="90vh" spacing={0} rounded="0.3rem" overflow="hidden" boxShadow="dark-lg">
                <Center bg="blue.600" width="20vw" height="full">
                    <VStack textAlign="center" align="center">
                        <Image boxSize="20em" src="/img/psoc-logo-2.png"></Image>
                        <Text fontSize="3xl" color="white">Your first open source contribution is on us.</Text>
                    </VStack>
                </Center>
                <Flex bg="blue.50" width="60vw" height="full" color="gray.700" alignItems="center" px="8rem" direction="column" justifyContent="center">
                    <LoginForm/>
                </Flex>
            </HStack>
        </Flex>
    )
};

export default Login;