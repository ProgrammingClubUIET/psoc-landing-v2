import { Flex, Heading, Text, Box, VStack, Accordion } from "@chakra-ui/react";
import ProjectMini from "../components/ProjectMini";

export const MOCK_PROJECTS = [
    {
        id: "1",
        name: "!answer",
        url: "https://github.com/hrik2001/answer",
        logo: "/img/project-logos/answer.svg",
        description: "!answer is a discord bot that leverages state of the art artificial intelligence to serve your users in your discord guild. You can give the bot context paragraphs, from which the bot will reply to any questions of users.",
        mentorName: "Rik"
    },
    {
        id: "2",
        name: "PClub Meet",
        url: "https://github.com/aryan-basu/Pclub-Meet",
        logo: "/img/project-logos/pmeet.png",
        description: "A Video-Meeting web application designed for the pclub core team meet.",
        mentorName: "Aryan Basu"
    },
    {
        id: "3",
        name: "Bundli Frontend",
        url: "https://github.com/Ayush7614/Bundli-Frontend#bundli-frontend",
        logo: "/img/project-logos/bundi.png",
        description: "Bundli-Frontend is an open-source project which contains different code for frontend Development with HTML, CSS, JS, REACT, ANGULAR and APIs etc. which makes your life easier for learning the frontend and makes your interest more in the frontend.",
        mentorName: "Ayush"
    },
    {
        id: "4",
        name: "Easy Job Intern",
        url: "https://github.com/pankajkumarbij/easy-job-intern",
        logo: "/img/project-logos/easyjobintern.png",
        description: "Project to provide the best job and internship opportunities. Companies can post here open applications for jobs and internships so students can make their profiles and apply to multiple companies.",
        mentorName: "Pankaj Kumar"
    }
]

const Projects = () => {
    const nProjects = MOCK_PROJECTS.length;

    return (
        <Flex width="full" bg="blue.500" justifyContent="center" pt="10vh" pb="5vh">
            <VStack alignItems="flex-start" spacing="3rem">
                <Box>
                    <Heading color="white" size="4xl">All Projects</Heading>
                    <Text color="blackAlpha.700" fontSize="2xl">Showing {nProjects} Projects</Text>
                </Box>
                <Flex bg="blue.50" width="90vw" rounded="0.3rem" boxShadow="dark-lg" overflow="hidden" pb="1rem">
                    <Accordion allowToggle allowMultiple width="full">
                        {MOCK_PROJECTS.map(ProjectMini)}
                    </Accordion>
                </Flex>
            </VStack>
        </Flex>
    )
};

export default Projects;