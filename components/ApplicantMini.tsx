import { AccordionButton, Center, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, HStack, Image, Text, VStack, LinkBox, LinkOverlay, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaClipboard, FaUserCheck, FaCheck } from "react-icons/fa";
import { acceptMentee } from "../lib/client/mentor";
import { useGlobalStore } from "../lib/ctx/store";
import { ApplicantsRes } from "../pages/api/mentor/project-applicants";
import CenterSpinner from "./CenterSpinner";

const AcceptModal = (p: { applicant: ApplicantsRes[0], disclosure: ReturnType<typeof useDisclosure> }) => {
    const router = useRouter();
    const client = useGlobalStore(s => s.client);
    const [loading, setLoading] = useState(false);
    const onClick = async () => {
        setLoading(true);
        await acceptMentee(client, {
            projectId: p.applicant.project.id,
            menteeId: p.applicant.menteeId
        });
        router.reload();
        setLoading(false);
        p.disclosure.onClose();
    }

    return (
        <Modal isOpen={p.disclosure.isOpen} onClose={p.disclosure.onClose}>
            <ModalOverlay/>
            <ModalContent>
                { !loading ?
                    <>
                        <ModalHeader>Are You Sure?</ModalHeader>
                        <ModalCloseButton></ModalCloseButton>
                        <ModalBody>
                            <Text>Are you sure that you want to accept {p.applicant.name} for Project `{p.applicant.project.name}` ?</Text>
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
                            >Yes</Button>
                        </ModalFooter>
                    </> :
                    <CenterSpinner py="2rem" width="full"></CenterSpinner>
                }
            </ModalContent>
        </Modal>
    )
}

const ApplicantMini = (m: ApplicantsRes[0]) => {
    const disclosure = useDisclosure();

    return <AccordionItem key={`${m.menteeId}+${m.project.id}`}>
        <AcceptModal applicant={m} disclosure={disclosure}></AcceptModal>
        <AccordionButton>
            <HStack alignItems="flex-start" spacing="4rem" width="full" p="2rem">
                <Image alt="Project Logo" borderRadius="full" boxSize="5em" src={m.project.logo}></Image>
                <Box textAlign="start">
                    <Text fontSize="3xl">{m.name}</Text>
                    <Text color="gray.600" fontSize="md">{m.project.name}</Text>
                </Box>
            </HStack>
            <AccordionIcon fontSize="lg"></AccordionIcon>
        </AccordionButton>
        <AccordionPanel>
            <VStack alignItems="flex-start" px="2rem" width="full">
                <Text fontSize="lg">{m.application}</Text>
                <Center width="full">
                    <HStack>
                        <LinkBox>
                            <Button
                                leftIcon={ <FaClipboard size="1.5rem"/> }
                                size="lg"
                                rounded="full"
                                colorScheme="red"
                                px="2rem"
                                fontSize="xl"
                            >
                                <LinkOverlay isExternal href={`/api/mentee/resume/${m.menteeId}`}>
                                    Resume
                                </LinkOverlay>
                            </Button>
                        </LinkBox>
                        <Button
                            leftIcon={ <FaUserCheck size="1.5rem" /> }
                            size="lg"
                            rounded="full"
                            colorScheme="lgreen"
                            px="2rem"
                            fontSize="xl"
                            onClick={disclosure.onOpen}
                        >
                            Accept
                        </Button>
                    </HStack>
                </Center>
            </VStack>
        </AccordionPanel>
    </AccordionItem>
}


export default ApplicantMini;