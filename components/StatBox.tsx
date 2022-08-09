import { Heading, VStack, Text } from "@chakra-ui/react";

const StatBox = (p: { desc: string, stat: number, color: string }) => (
    <VStack key={p.desc}>
        <Heading size="4xl" color={p.color}>
            {p.stat}+
        </Heading>
        <Text color={p.color} fontSize="3xl">
            {p.desc}
        </Text>
    </VStack>
);

export default StatBox;