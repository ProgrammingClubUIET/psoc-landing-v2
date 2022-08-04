import { Flex, Heading, Text, Center, HStack } from "@chakra-ui/react";
import { isLeft } from "fp-ts/lib/Either";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import AuthGuard from "../components/AuthGuard";
import CenterSpinner from "../components/CenterSpinner";
import { me } from "../lib/client/auth";
import { useGlobalStore } from "../lib/ctx/store";
import ProjectsAccordion from "../components/ProjectsAccordion";
import { ProjectRes } from "./api/projects";
import { getProjectsByMentor } from "../lib/client/projects";
import { ApplicantsRes } from "./api/mentor/project-applicants";
import { getApplicants, getProjectMentees } from "../lib/client/mentor";
import ApplicantsAccordion from "../components/ApplicantsAccordion";
import { MenteeInfo, MenteeRes } from "./api/mentor/project-mentees";
import MenteeMini from "../components/MenteeMini";

const StyledApplicants = (p: { mentees?: ApplicantsRes, heading: string }) => (
    <Flex width="90vw" bg="white" borderRadius="0.3rem" px="1.5rem" direction="column" mt="2rem" py="1.5rem" boxShadow="lg">
        <Text fontSize="2xl" fontWeight="medium">{p.heading}</Text>
        <Text fontSize="md" color="gray.400" hidden={p.mentees == undefined || p.mentees.length == 0}>Total {p.mentees?.length}</Text>
        <Center width="full" mt="1rem">
            {
                p.mentees?.length != 0 ?
                    <ApplicantsAccordion mentees={p.mentees} width="98%" boxShadow="lg" /> :
                    <Text p="2rem" fontSize="xl" color="gray.400">No Applicants (yet)</Text>
            }
        </Center>
    </Flex>
)

const StyledMentees = (p: { mentees?: MenteeInfo[], heading: string }) => (
    <Flex width="50%" bg="white" borderRadius="0.3rem" px="1.5rem" direction="column" py="1.5rem" boxShadow="lg">
        <Text fontSize="2xl">{p.heading}</Text>
        <Text fontSize="md" color="gray.400" hidden={p.mentees == undefined || p.mentees.length == 0}>Total {p.mentees?.length}</Text>
        <Center width="full" mt="1rem">
            {
                p.mentees?.length != 0 ?
                    <Flex width="98%" boxShadow="lg">
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

const Dashboard: NextPage = () => {
    const client = useGlobalStore(s => s.client);
    const auth = useGlobalStore(s => s.auth);
    const [userInfo, setUserInfo] = useState(undefined as { name: string } | undefined);
    const [projects, setProjects] = useState(undefined as ProjectRes[] | undefined);
    const [applicants, setApplicants] = useState(undefined as ApplicantsRes | undefined);
    const [mentees, setMentees] = useState(undefined as MenteeRes | undefined);

    useEffect(() => {
        (async () => {
            const res = await me(client);
            if (isLeft(res)) return;
            setUserInfo(res.right);
        })()
    }, []);

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
    })

    return <AuthGuard role="MENTOR">
        <Flex width="full" minHeight="100vh" bg="blue.500" pt="10vh" pb="5vh" px="3vw" alignItems="center" direction="column">
            { userInfo ?
                <>
                <Heading color="white">Hi, {userInfo.name.split(" ")[0]}!</Heading>
                <Flex width="90vw" bg="white" borderRadius="0.3rem" px="1.5rem" direction="column" mt="2rem" py="1.5rem" boxShadow="lg">
                    <Text fontSize="2xl" fontWeight="medium">Your Projects</Text>
                    <Text fontSize="md" color="gray.400" hidden={projects == undefined}>Total {projects?.length}</Text>
                    <Center width="full" mt="1rem">
                        <ProjectsAccordion hideAuthor={true} borderRadius="0.3rem" width="98%" boxShadow="lg" hideApply projects={projects}></ProjectsAccordion>
                    </Center>
                </Flex>
                <StyledApplicants heading="Applied Mentees" mentees={applicants} />
                <HStack width="90vw" alignItems="center" mt="2rem">
                    <StyledMentees heading="Accepted Mentees" mentees={mentees?.selectedMentees} />
                    <StyledMentees heading="Finalized Mentees" mentees={mentees?.finalizedMentees} />
                </HStack>
                </> :
                <CenterSpinner height="full" width="full" />
            }
        </Flex>
    </AuthGuard>
}

export default Dashboard;