import { Flex, Image, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Spacer } from "@chakra-ui/react";
import { useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { useGlobalStore } from "../lib/ctx/store";
import { useRouter } from "next/router";

// TODO: improve this
const NavBar = () => {
    const auth = useGlobalStore(s => s.auth);
    const setAuth = useGlobalStore(s => s.setAuth);
    const [authV, setAuthV] = useState(false);
    const router = useRouter();

    const { scrollYProgress, scrollY } = useScroll();
    const [opacity, setOpacity] = useState(1);

    const logout = () => {
        localStorage.removeItem("token");
        setAuth(undefined);
        router.push("/login");
    }

    useEffect(() => {
        setAuthV(auth != undefined)
    }, [auth]);

    useEffect(() => {
        return scrollYProgress.onChange((s) => {
            if (scrollY.get() == 0) return setOpacity(1);
            if (s >= 0.01 && opacity == 1) setOpacity(0.8);
        })
    }, [opacity, scrollYProgress, scrollY]);


    return <Flex width="100%" bg="blue.700" py="0.5rem" position="fixed" zIndex="100" opacity={opacity} alignItems="center">
        <Image ms={{base: "1rem", lg: "2rem"}} alt="PSoC Logo" src="/img/psoc-logo-1.png" boxSize="2.5em"></Image>
        <Spacer></Spacer>
        <Breadcrumb color="white" fontSize="2xl" separator=" " ms={{base: "1rem"}} me={{md: "1rem", lg: "2rem"}}>
            <BreadcrumbItem>
                <NextLink href="/" passHref>
                    <BreadcrumbLink>Home</BreadcrumbLink>
                </NextLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <NextLink href="/timeline" passHref>
                    <BreadcrumbLink>Timeline</BreadcrumbLink>
                </NextLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <NextLink href="/projects" passHref>
                    <BreadcrumbLink>Projects</BreadcrumbLink>
                </NextLink>
            </BreadcrumbItem>

            {authV ?
                <BreadcrumbItem>
                    <BreadcrumbLink onClick={logout}>Logout</BreadcrumbLink>
                </BreadcrumbItem> :
                <BreadcrumbItem>
                    <NextLink href="/login" passHref>
                        <BreadcrumbLink>Login</BreadcrumbLink>
                    </NextLink>
                </BreadcrumbItem>
            }
            {authV &&
                <BreadcrumbItem>
                            <NextLink href="/dashboard" passHref>
                                <BreadcrumbLink>Dashboard</BreadcrumbLink>
                            </NextLink>
                </BreadcrumbItem>
            }
            <BreadcrumbItem>
                <NextLink href="/about" passHref>
                    <BreadcrumbLink>About</BreadcrumbLink>
                </NextLink>
            </BreadcrumbItem>
        </Breadcrumb>
    </Flex>
};

export default NavBar;