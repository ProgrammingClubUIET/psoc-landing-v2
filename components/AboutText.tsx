import { Box, Heading, Text, VStack, Spacer } from "@chakra-ui/react";

const AboutText = (p: { heading: string, text: string, key: number }) => (
    <VStack color="blue.600" width="90vw" key={p.key} textAlign="center" pt="4rem" spacing="3rem">
        <Heading size="3xl">{p.heading}</Heading>
        <Text fontSize="xl">{p.text}</Text>
        <Box bg="blue.600" height="0.2rem" width="60%"></Box>
    </VStack>
)


export default AboutText;