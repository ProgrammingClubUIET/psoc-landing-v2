import { Flex, Heading } from "@chakra-ui/react";
import { isLeft } from "fp-ts/lib/Either";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import AuthGuard from "../components/AuthGuard";
import CenterSpinner from "../components/CenterSpinner";
import { me } from "../lib/client/auth";
import { useGlobalStore } from "../lib/ctx/store";
import MentorDashboard from "../components/MentorDashboard";
import MenteeDashboard from "../components/MenteeDashboard";


const Dashboard: NextPage = () => {
    const client = useGlobalStore(s => s.client);
    const auth = useGlobalStore(s => s.auth);
    const [userInfo, setUserInfo] = useState(undefined as { name: string } | undefined);

    useEffect(() => {
        (async () => {
            const res = await me(client);
            if (isLeft(res)) return;
            setUserInfo(res.right);
        })()
    }, []);

    return <AuthGuard>
        <Flex width="full" minHeight="100vh" bg="blue.500" pt="10vh" pb="5vh" px="3vw" alignItems="center" direction="column">
            { userInfo ?
                <>
                    <Heading color="white">Hi, {userInfo.name.split(" ")[0]}!</Heading>
                    {auth?.role === "MENTOR" ?
                        <MentorDashboard /> :
                        <MenteeDashboard />
                    }
                </> :
                <CenterSpinner height="full" width="full" />
            }
        </Flex>
    </AuthGuard>
}

export default Dashboard;