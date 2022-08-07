import { Flex, VStack, HStack, Text, Box, Button, Image, Center } from '@chakra-ui/react'
import { motion } from "framer-motion";
import NextLink from "next/link";

export const HERO_GRAD = "linear(to-t, cyan.400 13%, blue.600 60%)";

const Hero = () => (
    <Flex pt="6rem" pb="3.8rem" bgGradient={HERO_GRAD} direction="column" alignItems="center">
        <HStack>
            <VStack justify="center" align={{sm: "center", md: "flex-start"}} textAlign={["center", "start"]}>
                <Text maxW="60rem" color="white" fontSize={["4rem", "6rem"]} fontWeight="extrabold">PClub Summer Of Code</Text>
                <Text color="white" fontSize="2xl">Your first open source contribution is on us.</Text>
                <Center>
                    <NextLink href="/login" passHref>
                        <Button variant="primary">Mentor/Mentee Login</Button>
                    </NextLink>
                </Center>
            </VStack>
            <Center boxSize={[0, null, "2xl"]}>
                <Image alt="Hero Image" src="/img/pair-programming.svg"></Image>
            </Center>
        </HStack>
        <motion.div animate={{ y: "3.8rem" }} transition={{ repeat: Infinity, repeatType: "reverse", ease: "easeOut", duration: 2 }}>
        <Image alt="Arrow Down" src="/img/arrow-down.svg"></Image>
        </motion.div>
    </Flex>
)

export default Hero;