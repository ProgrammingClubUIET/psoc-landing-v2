import { Center, Flex, Text } from "@chakra-ui/react";
import { ProjectRes } from "../pages/api/projects";
import ProjectsAccordion from "./ProjectsAccordion";

export const ProjectsBoard = (p: {
    heading: string,
    projects?: ProjectRes[],
    accordionProps?: Parameters<typeof ProjectsAccordion>[0]
}) => {
    const accordionProps = {
        ...p.accordionProps,
        flexProps: {
            ...p.accordionProps?.flexProps,
            borderRadius: "0.3rem", width: "98%", boxShadow: "lg"
        },
        projects: p.projects
    }

    return <Flex width="90vw" bg="white" borderRadius="0.3rem" px="1.5rem" direction="column" mt="2rem" py="1.5rem" boxShadow="lg">
        <Text fontSize="2xl" fontWeight="medium">{p.heading}</Text>
        <Text fontSize="md" color="gray.400" hidden={p.projects == undefined}>Total {p.projects?.length}</Text>
        <Center width="full" mt="1rem">
            <ProjectsAccordion 
                {...accordionProps}
            />
        </Center>
    </Flex>
}