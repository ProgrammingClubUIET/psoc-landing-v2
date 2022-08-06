import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoginRequired from "./LoginRequired";
import { AuthInfo, useGlobalStore } from "../lib/ctx/store";
import { Flex, Spinner } from "@chakra-ui/react";
import * as jose from "jose";
import type { Role } from "@prisma/client";

function getAuth() {
    const cachedToken = localStorage.getItem("token");
    if (!cachedToken) return undefined;
    const cachedAuth: AuthInfo = JSON.parse(cachedToken);

    const payload = jose.decodeJwt(cachedAuth.token);
    if (payload.exp || Infinity > Date.now()/1000) return cachedAuth;

    localStorage.removeItem("token");
    return undefined;
}

function AuthGuard(c: { children: JSX.Element, role?: Role }) {
    const { auth, setAuth } = useGlobalStore(s => ({ auth: s.auth, setAuth: s.setAuth }));
    const [authVal, setAuthVal] = useState(false);

    const router = useRouter();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // this is unacceptable. NextJS fix your state management :|
        setAuthVal(auth != undefined);

        if (auth) {
            if (c.role && auth.role != c.role) {
                router.back();
            }
            return;
        };

        const token = getAuth();
        if (loading) setLoading(false);
        if (token) {
            setAuth(token);
            return;
        }

        if (!router.isReady) return;

        setTimeout(() => {
            router.push({ pathname: "/login", query: { redirect: router.asPath }});

        }, 400)
    }, [router, auth, c.role, loading, setAuth, setAuthVal]);

    if (authVal) return c.children;

    if (loading) return <Flex width="100vw" height="100vh" bg="blue.50" justifyContent="center" alignItems="center">
        <Spinner size="xl"></Spinner>
    </Flex>

    return <LoginRequired />;
}


export default AuthGuard;