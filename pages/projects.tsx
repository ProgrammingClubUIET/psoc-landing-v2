import { Flex, Heading, Text, Box, VStack, Accordion, Spinner, Center } from "@chakra-ui/react";
import { isLeft } from "fp-ts/lib/Either";
import { useEffect, useState } from "react";
import { getProjects } from "../lib/client/projects";
import { useGlobalStore } from "../lib/ctx/store";
import type { ProjectRes } from "./api/projects";
import ProjectsAccordion from "../components/ProjectsAccordion";
import { ApplyTag } from "../components/ProjectMini";

const Projects = () => {
    const [projects, setProjects] = useState(undefined as ProjectRes[] | undefined);
    const client = useGlobalStore(s => s.client);
    const auth = useGlobalStore(s => s.auth);

    useEffect(() => {
        (async () => {
            const res = await getProjects(client);
            if (isLeft(res)) return;

            setProjects(res.right);
        })()
    }, []);

    return (
        <Flex width="full" minHeight="100vh" bg="blue.500" justifyContent="center" pt="10vh" pb="5vh">
            <VStack alignItems="flex-start" spacing="3rem">
                <Box>
                    <Heading color="white" size="4xl">All Projects</Heading>
                    <Text color="blackAlpha.700" fontSize="2xl" hidden={projects == undefined || projects.length == 0}>Showing {projects?.length} Projects</Text>
                </Box>
                <ProjectsAccordion
                 flexProps={{bg: "blue.50", width: "90vw", rounded: "0.3rem", boxShadow: "dark-lg" }}
                 projects={projects}
                 rightButton={
                    auth?.role == "MENTOR" ?
                     undefined : ApplyTag
                 }
                ></ProjectsAccordion>
            </VStack>
        </Flex>
    )
};

export default Projects;