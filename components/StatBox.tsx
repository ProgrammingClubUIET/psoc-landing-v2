import { Heading, VStack, Text } from "@chakra-ui/react";

const StatBox = (p: { desc: string, stat: number, color: string, key: number }) => (
    <VStack width="full" key={p.key}>
        <Heading size="4xl" color={p.color}>
            {p.stat}+
        </Heading>
        <Text color={p.color} fontSize="3xl">
            {p.desc}
        </Text>
    </VStack>
);

export default StatBox;

