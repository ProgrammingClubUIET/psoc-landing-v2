import { AccordionButton, Center, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FaClipboardCheck } from "react-icons/fa";
import { Applicant } from "../pages/applicants";

const MenteeMini = (m: Applicant) => (
    <AccordionItem key={`${m.menteeId}+${m.project.id}`}>
        <AccordionButton>
            <HStack alignItems="flex-start" spacing="4rem" width="full" p="2rem">
                <Image boxSize="5em" src={m.project.logo}></Image>
                <Box textAlign="start">
                    <Text fontSize="3xl">{m.name}</Text>
                    <Text color="gray.600" fontSize="md">{m.project.name}</Text>
                </Box>
            </HStack>
            <AccordionIcon fontSize="lg"></AccordionIcon>
        </AccordionButton>
        <AccordionPanel>
            <VStack alignItems="flex-start" px="2rem">
                <Text fontSize="lg">{m.proposal}</Text>
                <Center width="full">
                    <Button
                        leftIcon={ <FaClipboardCheck size="1.5rem"/> }
                        size="lg"
                        rounded="full"
                        colorScheme="lgreen"
                        px="2rem"
                        fontSize="xl"
                    >
                        Accept
                    </Button>
                </Center>
            </VStack>
        </AccordionPanel>
    </AccordionItem>
)


export default MenteeMini;