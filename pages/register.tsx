import { Flex, VStack, Image, Text, Center, Grid, GridItem } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Register: NextPage = () => {
    return (
        <Flex width="full" bg="blue.400" height={{lg: "100vh" }} justifyContent="center">
            <Grid
                my={{base: "2.9rem", md: "4rem", lg: "8vh"}}
                mx="4vw"
                templateColumns={{base: "repeat(1, 1fr)", md: "repeat(1, 1r)", lg: "repeat(3, 1fr)"}}
                rounded="0.3rem"
                overflow="hidden"
                boxShadow="dark-lg"
                h={{lg: "88vh"}}
            >
                <GridItem>
                    <Center bg="blue.600" px={{lg: "8rem"}} py={{base: "2rem", md: "2rem", lg: "0rem"}} h="100%">
                        <VStack textAlign="center" align="center">
                            <Image alt="PSoC Logo" boxSize={["15rem", null, "20em"]} src="/img/psoc-logo-2.png"></Image>
                            <Text fontSize={{base: "2xl", md: "2xl", lg: "3xl"}} color="white">Your first open source contribution is on us.</Text>
                        </VStack>
                    </Center>
                </GridItem>
                <GridItem colSpan={2} overflow="scroll" minH="100%" bg="blue.50" py={["2rem"]}>
                    <Flex
                        color="gray.700"
                        alignItems="center"
                        px={["2rem", "4rem", "8rem"]}
                        direction="column"
                        justifyContent="center"
                    >
                        <RegisterForm/>
                    </Flex>
                </GridItem>
            </Grid>
        </Flex>
    )
};

export default Register;