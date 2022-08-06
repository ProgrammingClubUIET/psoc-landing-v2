import { Flex, VStack, HStack, Text, Box, Button, Image, Center } from '@chakra-ui/react'
import { motion } from "framer-motion";
import NextLink from "next/link";

export const HERO_GRAD = "linear(to-t, cyan.400 13%, blue.600 60%)";

const Hero = () => (
    <VStack width="full" height="102vh" bgGradient={HERO_GRAD}>
        <HStack mt="12vh" mx="20">
            <VStack align="flex-start">
                <Box maxW="60rem">
                <Text color="white" fontSize="6rem" fontWeight="extrabold">PClub Summer Of Code</Text>
                </Box>
                <Text color="white" fontSize="2xl">Your first open source contribution is on us.</Text>
                <NextLink href="/login" passHref>
                    <Button variant="primary">Mentor/Mentee Login</Button>
                </NextLink>
            </VStack>
            <Center boxSize="2xl">
                <Image alt="Hero Image" src="/img/pair-programming.svg"></Image>
            </Center>
        </HStack>
        <Center boxSize="sm" width="full" position="relative" mt="0vh">
            <motion.div animate={{ y: "3.8rem" }} transition={{ repeat: Infinity, repeatType: "reverse", ease: "easeOut", duration: 2 }}>
            <Image alt="Arrow Down" src="/img/arrow-down.svg"></Image>
            </motion.div>
        </Center>
    </VStack>
)

export default Hero;