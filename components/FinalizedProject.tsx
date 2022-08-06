import { Flex, VStack, Image, Heading, Text, Spacer, Center, Box } from "@chakra-ui/react";
import { ProjectRes } from "../pages/api/projects";

const FinalizedProject = (p: { project: ProjectRes }) => (
    <Flex
        width="90%"
        bg="white"
        borderRadius="0.3rem"
        direction="column"
        mt="2rem"
        boxShadow="dark-lg"
        justifyContent="center"
        alignItems="center"
        minHeight="90%"
        py="2rem"
    >
        <Heading size="lg">Your Finalized Project for PSoC 2022</Heading>
        <Spacer></Spacer>
        <VStack py="8vh" spacing="2rem">
            <Image alt="Project Logo" src={p.project.logo} rounded="full" boxSize="15em"></Image>
            <Box textAlign="center">
                <Text fontSize="2xl">{p.project.name}</Text>
                <Text fontSize="lg" color="gray.400">Mentor: {p.project.mentorName}</Text>
            </Box>
            <Text fontSize="md">{p.project.description}</Text>
        </VStack>
        <Spacer></Spacer>
        <Text color="gray.400" size="sm">Stay Tuned for More Info!</Text>
    </Flex>

)


export default FinalizedProject;