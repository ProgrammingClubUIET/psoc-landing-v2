import { AccordionButton, Center, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, HStack, Image, Text, VStack, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { FaClipboard, FaUserCheck } from "react-icons/fa";
import { ApplicantsRes } from "../pages/api/mentor/project-applicants";

const ApplicantMini = (m: ApplicantsRes[0]) => (
    <AccordionItem key={`${m.menteeId}+${m.project.id}`}>
        <AccordionButton>
            <HStack alignItems="flex-start" spacing="4rem" width="full" p="2rem">
                <Image borderRadius="full" boxSize="5em" src={m.project.logo}></Image>
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
                        >
                            Accept
                        </Button>
                    </HStack>
                </Center>
            </VStack>
        </AccordionPanel>
    </AccordionItem>
)


export default ApplicantMini;