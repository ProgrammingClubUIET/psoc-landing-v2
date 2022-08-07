import { Flex, HStack, VStack, Image, Text, Center, Heading, FormControl, FormLabel, Input, Box, Button, Divider, SimpleGrid, Grid, GridItem } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import LoginForm from "../components/LoginForm";

const Login: NextPage = () => {
    const router = useRouter();
    const { redirect } = router.query;

    return (
        <Flex width="full" bg="blue.400" height={{lg: "100vh" }} justifyContent="center">
            <Grid
                my={{base: "2.9rem", md: "4rem", lg: "8vh"}}
                mx="4vw"
                templateColumns={["repeat(1, 1fr)", null, "repeat(3, 1fr)"]}
                rounded="0.3rem"
                overflow="hidden"
                boxShadow="dark-lg"
                h={{lg: "88vh"}}
            >
                <GridItem>
                    <Center bg="blue.600" px={{lg: "8rem"}} py={["2rem", null, "0rem"]} h={{lg: "100%"}}>
                        <VStack textAlign="center" align="center">
                            <Image alt="PSoC Logo" boxSize={["15rem", null, "20em"]} src="/img/psoc-logo-2.png"></Image>
                            <Text fontSize={["2xl", null, "3xl"]} color="white">Your first open source contribution is on us.</Text>
                        </VStack>
                    </Center>
                </GridItem>
                <GridItem colSpan={2}>
                    <Flex
                        h={{lg: "100%"}}
                        bg="blue.50"
                        py={["2rem"]}
                        color="gray.700"
                        alignItems="center"
                        px={["2rem", "4rem", "8rem"]}
                        direction="column"
                        justifyContent="center"
                    >
                        <LoginForm redirect={redirect as string}/>
                    </Flex>
                </GridItem>
            </Grid>
        </Flex>
    )
};

export default Login;