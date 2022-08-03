import { Accordion, Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import MenteeMini from "../components/MenteeMini";
import { MOCK_PROJECTS } from "./projects";

const MOCK_APPLICANTS = [
    {
        menteeId: "1",
        name: "Rupansh",
        proposal: "I think I can help you with this project",
        project: MOCK_PROJECTS[0]
    },
    {
        menteeId: "2",
        name: "Jivtesh",
        proposal: "I want to learn frontend",
        project: MOCK_PROJECTS[2]
    }
]

export type Applicant = typeof MOCK_APPLICANTS[0]

const Applicants = () => {
    const nApplicants = MOCK_APPLICANTS.length;

    return (
    <Flex width="full" bg="blue.500" justifyContent="center" pt="10vh" pb="5vh" minHeight="100vh">
        <VStack alignItems="flex-start" spacing="3rem">
            <Box>
                <Heading color="white" size="4xl">All Mentees</Heading>
                <Text color="blackAlpha.700" fontSize="2xl">Showing {nApplicants} Mentees</Text>
            </Box>
            <Flex bg="blue.50" width="90vw" rounded="0.3rem" boxShadow="dark-lg" overflow="hidden" pb="1rem">
                <Accordion allowToggle allowMultiple width="full">
                    {MOCK_APPLICANTS.map(MenteeMini)}
                </Accordion>
            </Flex>
        </VStack>
    </Flex>
    )
}


export default Applicants;