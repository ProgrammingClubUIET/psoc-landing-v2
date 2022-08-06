import { HStack, SimpleGrid, Heading, VStack, Image, Text, Center, Button, Flex } from "@chakra-ui/react";
import NextLink from "next/link";

const ProjIcon = (p: { iconPath: string, name: string }) => (
    <VStack>
        <Image alt="Project Logo" boxSize="11em" src={`/img/project-logos/${p.iconPath}`} borderRadius="full"></Image>
        <Text color="white" fontWeight="bold">{p.name}</Text>
    </VStack>
)

const FrontProjs = () => (
    <Flex width="full" alignItems="center">
        <Center height="full" width="60em">
            <Text color="blue.600" fontSize="8em" textAlign="center" fontWeight="medium">Notable Projects</Text>
        </Center>
        <VStack width="70vw" bg="blue.700" py="4rem">
            <SimpleGrid columns={2} spacingX="60" spacingY="30">
                <ProjIcon iconPath="answer.svg" name="!answer"></ProjIcon>
                <ProjIcon iconPath="pmeet.png" name="PClub Meet"></ProjIcon>
                <ProjIcon iconPath="bundi.png" name="Bundli Frontend"></ProjIcon>
                <ProjIcon iconPath="easyjobintern.png" name="Easy Job Intern"></ProjIcon>
            </SimpleGrid>
            <NextLink href="/projects" passHref>
                <Button variant="primary">All Projects</Button>
            </NextLink>
        </VStack>
    </Flex>
);

export default FrontProjs;