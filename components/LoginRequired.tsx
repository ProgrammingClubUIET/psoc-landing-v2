import { Flex, Heading } from "@chakra-ui/react";

const LoginRequired = () => (
    <Flex width="100vw" height="100vh" bg="blue.50" justifyContent="center" alignItems="center" textAlign="center">
        <Heading size="2xl">Login Required! Redirecting...</Heading>
    </Flex>
);

export default LoginRequired;