import { Flex, VStack, Stack, Text, Box, Button, Image, Center } from '@chakra-ui/react'
import { motion } from "framer-motion";
import NextLink from "next/link";

export const HERO_GRAD = "linear(to-t, cyan.400 13%, blue.600 60%)";

const Hero = () => (
    <Flex pt="6rem" pb="3.8rem" bgGradient={HERO_GRAD} direction="column" alignItems="center">
        <Stack direction={{ base: "column", md: "column-reverse", lg: "row" }}>
            <VStack justify="center" align={{base: "center", md: "center", lg: "flex-start"}} textAlign={["center", "center", "start"]}>
                <Text maxW="60rem" color="white" fontSize={{ base: "4rem", md: "4rem", lg: "6rem"}} fontWeight="extrabold">PClub Summer Of Code</Text>
                <Text color="white" fontSize="2xl">Your first open source contribution is on us.</Text>
                <Center>
                    <NextLink href="/login" passHref>
                        <Button variant="primary">Mentor/Mentee Login</Button>
                    </NextLink>
                </Center>
            </VStack>
            <Center boxSize={{base: 0, md: "xl", lg: "2xl"}} width={{md: "100%"}}>
                <Image boxSize={{base: 0, md: "xl", lg: "2xl"}} alt="Hero Image" src="/img/pair-programming.svg"></Image>
            </Center>
        </Stack>
        <motion.div animate={{ y: "3.8rem" }} transition={{ repeat: Infinity, repeatType: "reverse", ease: "easeOut", duration: 2 }}>
        <Image alt="Arrow Down" src="/img/arrow-down.svg"></Image>
        </motion.div>
    </Flex>
)

export default Hero;