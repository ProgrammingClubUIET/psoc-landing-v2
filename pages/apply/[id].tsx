import { Image, Text, VStack, Flex, Box } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { ApplyProjectCtx } from "../../lib/apply-ctx";
import ProposalForm from "../../components/ProposalForm";

const ApplyProject = ()  => {
    const router = useRouter();
    const { id } = router.query; 
    const applyProjectCtx = useContext(ApplyProjectCtx);
    const projInfo = applyProjectCtx.cache;
    if (!projInfo) {
        useEffect(() => {
            // TODO: fetch from api
            router.push("/")
        }, [])
    }

    return <Flex bg="blue.400" width="100vw" minHeight="100vh" justifyContent="center" alignItems="center">
        <VStack bg="blue.50" width="60vw" py="2rem" mt="3rem" boxShadow="dark-lg" rounded="0.3rem" spacing="4rem">
            <Image rounded="full" boxSize="15em" src={projInfo?.logo}></Image>
            <Text fontSize="2xl">{projInfo?.name}</Text>
            <Box width="full" px="8rem">
                <ProposalForm projectId={id as string}></ProposalForm>
            </Box>
        </VStack>
    </Flex>
}

export default ApplyProject;