import { Accordion, Flex, FlexProps } from "@chakra-ui/react"
import { ProjectRes } from "../pages/api/projects";
import CenterSpinner from "./CenterSpinner";
import ProjectMini from "./ProjectMini";

const ProjectsAccordion = (p: { projects?: ProjectRes[], hideApply: boolean, hideAuthor?: boolean } & FlexProps) => {
    return <Flex {...p} overflow="hidden" pb="1rem">
    {p.projects ?
        <Accordion allowToggle allowMultiple width="full">
            {p.projects.map((pr) => ProjectMini(pr, p.hideApply, p.hideAuthor))}
        </Accordion> :
        <CenterSpinner width="full" height="20vh"></CenterSpinner>
    }
    </Flex>
}

export default ProjectsAccordion;