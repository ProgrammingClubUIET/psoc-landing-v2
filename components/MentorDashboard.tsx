import { Box, Center, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { isLeft } from "fp-ts/lib/Either";
import { useEffect, useState } from "react";
import { getApplicants, getProjectMentees } from "../lib/client/mentor";
import { getProjectsByMentor } from "../lib/client/projects";
import { useGlobalStore } from "../lib/ctx/store";
import { ApplicantsRes } from "../pages/api/mentor/project-applicants";
import { MenteeInfo, MenteeRes } from "../pages/api/mentor/project-mentees";
import { ProjectRes } from "../pages/api/projects";
import ApplicantsAccordion from "./ApplicantsAccordion";
import CenterSpinner from "./CenterSpinner";
import MenteeMini from "./MenteeMini";
import { ProjectsBoard } from "./ProjectsBoard";


const StyledApplicants = (p: { mentees?: ApplicantsRes, heading: string }) => (
    <Flex width="90vw" bg="white" borderRadius="0.3rem" px="1.5rem" direction="column" mt="2rem" py="1.5rem" boxShadow="lg">
        <Text fontSize="2xl" fontWeight="medium">{p.heading}</Text>
        <Text fontSize="md" color="gray.400" hidden={p.mentees == undefined || p.mentees.length == 0}>Total {p.mentees?.length}</Text>
        <Center width="full" mt="1rem">
            {
                p.mentees?.length != 0 ?
                    <ApplicantsAccordion
                        mentees={p.mentees}
                        flexProps={{width: "98%", boxShadow: "lg", borderRadius: "0.3em"}}
                    /> :
                    <Text p="2rem" fontSize="xl" color="gray.400">No Applicants (yet)</Text>
            }
        </Center>
    </Flex>
)

const StyledMentees = (p: { mentees?: MenteeInfo[], heading: string }) => (
    <Flex height="fit-content" bg="white" borderRadius="0.3rem" px="1.5rem" direction="column" py="1.5rem" boxShadow="lg">
        <Text fontSize="2xl">{p.heading}</Text>
        <Text fontSize="md" color="gray.400" hidden={p.mentees == undefined || p.mentees.length == 0}>Total {p.mentees?.length}</Text>
        <Center width="full" mt="1rem">
            {
                p.mentees?.length != 0 ?
                    <Flex width="98%" boxShadow="lg" borderRadius="0.3em">
                        {p.mentees ?
                            p.mentees.map((m, i) => MenteeMini(m, i)) :
                            <CenterSpinner width="full" py="2rem"></CenterSpinner>
                        }
                    </Flex> :
                    <Text p="2rem" color="gray.400" fontSize="xl">No Mentees (yet)</Text>
            }
        </Center>
    </Flex>
)

const MentorDashboard = () => {
    const client = useGlobalStore(s => s.client);
    const [projects, setProjects] = useState(undefined as ProjectRes[] | undefined);
    const [applicants, setApplicants] = useState(undefined as ApplicantsRes | undefined);
    const [mentees, setMentees] = useState(undefined as MenteeRes | undefined);


    useEffect(() => {
        (async () => {
            const res = await getProjectsByMentor(client);
            if (isLeft(res)) return;
            setProjects(res.right);
        })()
    }, []);

    useEffect(() => {
        (async () => {
            const res = await getApplicants(client);
            if (isLeft(res)) return;

            setApplicants(res.right);
        })()
    }, []);

    useEffect(() => {
        (async () => {
            const res = await getProjectMentees(client);
            if (isLeft(res)) return;

            setMentees(res.right)
        })()
    }, []);

    return <>
        <ProjectsBoard
            heading="Your Projects"
            projects={projects}
            accordionProps={{ hideAuthor: true }}
        ></ProjectsBoard>
        <StyledApplicants heading="Applied Mentees" mentees={applicants} />
        <SimpleGrid columns={[1, null, 2]} mt="2rem" gap="1rem" width="90vw">
            <StyledMentees heading="Accepted Mentees" mentees={mentees?.selectedMentees} />
            <StyledMentees heading="Finalized Mentees" mentees={mentees?.finalizedMentees} />
        </SimpleGrid>
    </>
}

export default MentorDashboard;