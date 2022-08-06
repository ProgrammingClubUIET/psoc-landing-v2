import { Button, Center, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { isLeft } from "fp-ts/lib/Either";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaCheckDouble, FaCheck } from "react-icons/fa";
import { finalizeProject, getAcceptedProjects, getAppliedProjects, getFinalizedProject } from "../lib/client/mentee";
import { useGlobalStore } from "../lib/ctx/store";
import { ProjectRes } from "../pages/api/projects";
import CenterSpinner from "./CenterSpinner";
import FinalizedProject from "./FinalizedProject";
import { ProjectsBoard } from "./ProjectsBoard";

const FinalizeModal = (p: { project: ProjectRes, disclosure: ReturnType<typeof useDisclosure> }) => {
    const router = useRouter();
    const client = useGlobalStore(s => s.client);
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        setLoading(true);
        await finalizeProject(client, { projectId: p.project.id })
        router.reload();
        setLoading(false);
        p.disclosure.onClose();
    };

    return <Modal isOpen={p.disclosure.isOpen} onClose={p.disclosure.onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
            { !loading ?
                <>
                    <ModalHeader>Are You Sure?</ModalHeader>
                    <ModalCloseButton></ModalCloseButton>
                    <ModalBody>
                        <Text>Are you sure that you want to work on `{p.project.name}` for the entire duration of PSoC 2022?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            px="2rem"
                            py="0.5rem"
                            size="xl"
                            colorScheme="lgreen"
                            rounded="full"
                            fontSize="1rem"
                            leftIcon={ <FaCheck fontSize="1rem" /> } 
                            onClick={onClick}
                        >
                            Yes
                        </Button>
                    </ModalFooter>
                </> :
                <CenterSpinner py="2rem" width="full" />
            }
        </ModalContent>
    </Modal>
}

const FinalizeTag = (p: { proj: ProjectRes }) => {
    const disclosure = useDisclosure();
    return <>
        <FinalizeModal project={p.proj} disclosure={disclosure}></FinalizeModal>
        <Button
            rounded="full"
            leftIcon={ <FaCheckDouble size="1.5rem"></FaCheckDouble> }
            colorScheme="green"
            size="lg"
            onClick={disclosure.onOpen}
        >Finalize</Button>
    </>
}

const MenteeProjectsBoard = () => {
    const [appliedProjects, setAppliedProjects] = useState(undefined as ProjectRes[] | undefined);
    const [acceptedProjects, setAcceptedProjects] = useState(undefined as ProjectRes[] | undefined);
    const client = useGlobalStore(s => s.client);

    useEffect(() => {
        (async () => {
            const res = await getAppliedProjects(client);
            if (isLeft(res)) return;
            setAppliedProjects(res.right);
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const res = await getAcceptedProjects(client);
            if (isLeft(res)) return;
            setAcceptedProjects(res.right);
        })()
    }, [])

    return <>
        <ProjectsBoard
            heading="Applied Projects"
            projects={appliedProjects}
        ></ProjectsBoard>
        <ProjectsBoard
            heading="Accepted Projects"
            projects={acceptedProjects}
            accordionProps={{
                rightButton: FinalizeTag
            }}
        ></ProjectsBoard>
    </>
}

const MenteeDashboard = () => {
    const [finalizedProject, setFinalizedProject] = useState(undefined as ProjectRes | undefined);
    const [loading, setLoading] = useState(true);
    const client = useGlobalStore(s => s.client);

    useEffect(() => {
        (async () => {
            const res = await getFinalizedProject(client);
            if (isLeft(res)) {
                if (res.left.code == 400) setLoading(false);
                return;
            };
            setFinalizedProject(res.right);
            setLoading(false);
        })()
    }, []);

    if (loading) return <CenterSpinner height="full" width="full"></CenterSpinner>;

    if (finalizedProject) return <FinalizedProject project={finalizedProject} />

    return <MenteeProjectsBoard/>
}

export default MenteeDashboard;