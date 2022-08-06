import { Accordion, Flex, FlexProps, Text } from "@chakra-ui/react"
import { ProjectRes } from "../pages/api/projects";
import CenterSpinner from "./CenterSpinner";
import ProjectMini, { ProjectButton } from "./ProjectMini";

const ProjectsAccordion = (p: { projects?: ProjectRes[], rightButton?: ProjectButton, hideAuthor?: boolean, flexProps?: FlexProps }) => {
    return <Flex {...p.flexProps} overflow="hidden" pb="1rem">
    {p.projects ?
        p.projects.length != 0 ?
            <Accordion allowToggle allowMultiple width="full">
                {p.projects.map((pr) => ProjectMini(pr, p.rightButton, p.hideAuthor))}
            </Accordion>
            :
             <Text p="2rem" fontSize="xl" color="gray.400" textAlign="center" width="full">No Projects Available</Text>
        :
        <CenterSpinner width="full" height="20vh"></CenterSpinner>
    }
    </Flex>
}

export default ProjectsAccordion;