import { Box, Button, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { isLeft } from "fp-ts/lib/Either";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { authClient } from "../lib/client/auth";
import { useGlobalStore } from "../lib/ctx/store";
import { LoginReq } from "../lib/requests/login";

const LoginForm = (p: { redirect?: string }) => {
    const { client, auth, setAuth } = useGlobalStore(s => ({ client: s.client, auth: s.auth, setAuth: s.setAuth }));
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm<LoginReq>();
    const onSubmit = handleSubmit(async (r) => {
        if (auth) return;

        const token = await authClient(client, r);
        if (isLeft(token)) {
            reset();
            return;
        }

        const authObj = { token: token.right.token, role: token.right.user_info.role };
        localStorage.setItem("auth", JSON.stringify(authObj));
        setAuth(authObj);
    });

    useEffect(() => {
        if (auth)
            router.push(p.redirect || "/dashboard");

    }, [auth, router, p.redirect])

    return (<>
        <Heading size="3xl">Login</Heading>
        <Box mt="8rem" width="full">
            <form onSubmit={onSubmit}>
                <FormControl isRequired>
                    <FormLabel fontSize="2xl">Email Address</FormLabel>
                    <Input {...register("email")} py="1.8rem" size="lg" type="email" placeholder="example@abc.com"></Input>
                </FormControl>
                <FormControl isRequired mt="4">
                    <FormLabel fontSize="2xl">Password</FormLabel>
                    <Input {...register("password")} py="1.8rem" size="lg" type="password" placeholder="Enter your password"></Input>
                </FormControl>
                <Button type="submit" mt="6rem" width="full" variant="primary" rounded="1rem">Sign In</Button>
            </form>
        </Box>
    </>)
}

export default LoginForm;