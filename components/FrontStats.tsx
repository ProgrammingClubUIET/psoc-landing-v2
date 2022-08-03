import { Flex } from "@chakra-ui/react";
import StatBox from "./StatBox";

export const STATS = [
    {
        desc: "Participants",
        stat: 100
    },
    {
        desc: "Institutes",
        stat: 19
    },
    {
        desc: "Mentee",
        stat: 90
    },
    {
        desc: "States",
        stat: 12
    }
];

const FrontStats = () => (
    <Flex width="full" gap="3" alignItems="center" py="3rem">
        {STATS.map((v, i) => StatBox({ color: "blue.600", ...v, key: i }))}
    </Flex>
)

export default FrontStats;