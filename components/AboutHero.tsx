import { VStack, Image, HStack, Center, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { STATS } from "./FrontStats";
import { HERO_GRAD } from "./Hero";
import StatBox from "./StatBox";


const AboutHero = () => (
    <VStack pt="10vh" bgGradient={HERO_GRAD} width="full" height="100vh" boxShadow="0 2xl 2xl -2xl" spacing="8rem">
        <Image alt="PSoC Logo" boxSize="xs" src="/img/psoc-logo-2.png"></Image>
        <SimpleGrid width="full" columns={[2, null, 4]}>
            {STATS.map((v, i) => StatBox({ color: "white", ...v }))}
        </SimpleGrid>
    </VStack>
);


export default AboutHero;
