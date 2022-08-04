import { Flex, Heading, Text, Box, VStack, Accordion, Spinner, Center } from "@chakra-ui/react";
import { isLeft } from "fp-ts/lib/Either";
import { useEffect, useState } from "react";
import CenterSpinner from "../components/CenterSpinner";
import ProjectMini from "../components/ProjectMini";
import { getProjects } from "../lib/client/projects";
import { useGlobalStore } from "../lib/ctx/store";
import type { ProjectRes } from "./api/projects";

const Projects = () => {
    const [projects, setProjects] = useState(undefined as ProjectRes[] | undefined);
    const n = projects?.length || 0;
    const client = useGlobalStore(s => s.client);

    useEffect(() => {
        (async () => {
            const res = await getProjects(client);
            if (isLeft(res)) return;

            setProjects(res.right);
        })()
    })

    return (
        <Flex width="full" minHeight="100vh" bg="blue.500" justifyContent="center" pt="10vh" pb="5vh">
            <VStack alignItems="flex-start" spacing="3rem">
                <Box>
                    <Heading color="white" size="4xl">All Projects</Heading>
                    <Text color="blackAlpha.700" fontSize="2xl" hidden={n == 0}>Showing {n} Projects</Text>
                </Box>
                <Flex bg="blue.50" width="90vw" rounded="0.3rem" boxShadow="dark-lg" overflow="hidden" pb="1rem">
                    {projects ?
                        <Accordion allowToggle allowMultiple width="full">
                            {projects.map(ProjectMini)}
                        </Accordion> :
                        <CenterSpinner width="full" height="20vh"></CenterSpinner>
                    }
                </Flex>
            </VStack>
        </Flex>
    )
};

export default Projects;