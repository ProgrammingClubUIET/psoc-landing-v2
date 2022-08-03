import { Box, Button, Flex, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";

const LoginForm = () => {
    return (<>
        <Heading size="3xl">Login</Heading>
        <Box mt="8rem" width="full">
            <form>
                <FormControl isRequired>
                    <FormLabel fontSize="2xl">Email Address</FormLabel>
                    <Input py="1.8rem" size="lg" type="email" placeholder="example@abc.com"></Input>
                </FormControl>
                <FormControl isRequired mt="4">
                    <FormLabel fontSize="2xl">Password</FormLabel>
                    <Input py="1.8rem" size="lg" type="password" placeholder="Enter your password"></Input>
                </FormControl>
                <Button mt="6rem" width="full" variant="primary" rounded="1rem">Sign In</Button>
            </form>
        </Box>
    </>)
}

export default LoginForm;