import { HStack, SimpleGrid, Heading, VStack, Image, Text, Center, Button, Flex, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";

const ProjIcon = (p: { iconPath: string, name: string }) => (
    <VStack>
        <Image alt="Project Logo" boxSize={["6rem", "8rem", "11rem"]} src={`/img/project-logos/${p.iconPath}`} borderRadius="full"></Image>
        <Text color="white" fontWeight="bold">{p.name}</Text>
    </VStack>
)

const FrontProjs = () => (
    <SimpleGrid alignItems="center" justifyContent="center" columns={{sm: 1, lg: 2}} spacingY="4rem">
        <Text color="blue.600" fontSize={["4rem", "6rem", "8rem"]} textAlign="center" fontWeight="medium">Notable Projects</Text>
        <VStack bg="blue.700" py="4rem" spacing="2rem">
            <SimpleGrid columns={2} spacingX={["7rem", "10rem", '15rem']} spacingY="4rem" >
                <ProjIcon iconPath="answer.svg" name="!answer"></ProjIcon>
                <ProjIcon iconPath="pmeet.png" name="PClub Meet"></ProjIcon>
                <ProjIcon iconPath="bundi.png" name="Bundli Frontend"></ProjIcon>
                <ProjIcon iconPath="easyjobintern.png" name="Easy Job Intern"></ProjIcon>
            </SimpleGrid>
            <NextLink href="/projects" passHref>
                <Button variant="primary">All Projects</Button>
            </NextLink>
        </VStack>
    </SimpleGrid>
);

export default FrontProjs;