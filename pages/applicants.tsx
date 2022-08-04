import { Accordion, Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { isLeft } from "fp-ts/lib/Either";
import { useEffect, useState } from "react";
import AuthGuard from "../components/AuthGuard";
import CenterSpinner from "../components/CenterSpinner";
import MenteeMini from "../components/MenteeMini";
import { getApplicants } from "../lib/client/mentor";
import { useGlobalStore } from "../lib/ctx/store";
import { ApplicantsRes } from "./api/mentor/project-applicants";

const Applicants = () => {
    const [applicants, setApplicants] = useState(undefined as ApplicantsRes[] | undefined);
    const client = useGlobalStore(s => s.client);

    useEffect(() => {
        (async () => {
            const res = await getApplicants(client);
            if (isLeft(res)) return;

            setApplicants(res.right);
        })()
    }, [])

    return (
    <AuthGuard>
        <Flex width="full" bg="blue.500" justifyContent="center" pt="10vh" pb="5vh" minHeight="100vh">
            <VStack alignItems="flex-start" spacing="3rem">
                <Box>
                    <Heading color="white" size="4xl">All Mentees</Heading>
                    <Text color="blackAlpha.700" fontSize="2xl" hidden={applicants == undefined}>Showing {applicants?.length} Mentees</Text>
                </Box>
                <Flex bg="blue.50" width="90vw" rounded="0.3rem" boxShadow="dark-lg" overflow="hidden" pb="1rem">
                    {applicants ? 
                        <Accordion allowToggle allowMultiple width="full">
                        {applicants.map(MenteeMini)}
                        </Accordion> :
                        <CenterSpinner width="full" height="20vh"></CenterSpinner>
                    }
                </Flex>
            </VStack>
        </Flex>
    </AuthGuard>
    )
}


export default Applicants;