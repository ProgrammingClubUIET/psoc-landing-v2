import { Accordion, Flex, FlexProps } from "@chakra-ui/react"
import { ApplicantsRes } from "../pages/api/mentor/project-applicants";
import CenterSpinner from "./CenterSpinner";
import ApplicantMini from "./ApplicantMini";

const ApplicantsAccordion = (p: { mentees?: ApplicantsRes } & FlexProps) => {
    return <Flex {...p} overflow="hidden" pb="1rem">
        {p.mentees ? 
            <Accordion allowToggle allowMultiple width="full">
                {p.mentees?.map(ApplicantMini)}
            </Accordion> :
            <CenterSpinner width="full" height="20vh"></CenterSpinner>
        }
    </Flex>
}

export default ApplicantsAccordion;