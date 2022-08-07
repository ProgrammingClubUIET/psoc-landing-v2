import { Flex, SimpleGrid, Spacer } from "@chakra-ui/react";
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
    <SimpleGrid columns={[2, 4]} py="2rem">
        {STATS.map((v, i) => <StatBox color="blue.600" {...v} key={i}></StatBox>)}
    </SimpleGrid>
)

export default FrontStats;