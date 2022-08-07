import { Image, Text, VStack, Flex, Box } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ApplyProjectCtx } from "../../lib/ctx/apply-ctx";
import ProposalForm from "../../components/ProposalForm";
import AuthGuard from "../../components/AuthGuard";
import { getProject } from "../../lib/client/projects";
import { useGlobalStore } from "../../lib/ctx/store";
import { isLeft } from "fp-ts/lib/Either";
import CenterSpinner from "../../components/CenterSpinner";
import { getFinalizedProject } from "../../lib/client/mentee";

const ApplyProject = ()  => {
    const router = useRouter();
    const { id } = router.query; 
    const applyProjectCtx = useContext(ApplyProjectCtx);
    const [projInfo, setProjInfo] = useState(applyProjectCtx.cache?.id == id ? applyProjectCtx.cache : undefined);
    const client = useGlobalStore(s => s.client);

    useEffect(() => {
        if (!router.isReady) return;
        if (projInfo) return;

        (async () => {
            const finalizedProject = await getFinalizedProject(client);
            if (finalizedProject) {
                router.push("/dashboard");
                return;
            }

            const proj = await getProject(client, id as string);
            if (isLeft(proj)) return;

            setProjInfo(proj.right);
        })()
    }, [router, projInfo, id]);

    return (
    <AuthGuard role="MENTEE">
        <Flex bg="blue.400" justifyContent="center" alignItems="center" height="100vh">
            <VStack bg="blue.50" mx={{base: "0.8rem"}} width={{md: "90vw", lg: "60vw"}} py="2rem" mt="3rem" boxShadow="dark-lg" rounded="0.3rem" spacing="4rem">
                { !projInfo ?
                    <CenterSpinner width="full" /> :
                    <>
                        <Image alt="Project Logo" rounded="full" boxSize="15em" src={projInfo?.logo}></Image>
                        <Text fontSize="2xl">{projInfo?.name}</Text>
                        <Box width={{md: "full", lg: "full"}} px={["4rem", "5rem", "8rem"]}>
                            <ProposalForm projectId={id as string}></ProposalForm>
                        </Box>
                    </>
                }
            </VStack>
        </Flex>
    </AuthGuard>
    )
}

export default ApplyProject;