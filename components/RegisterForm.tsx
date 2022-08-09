import { Box, Button, FormControl, FormLabel, Heading, Input, Select } from "@chakra-ui/react";
import { isLeft } from "fp-ts/lib/Either";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { authClient, RegisterReqClient, registerUser } from "../lib/client/auth";
import { useGlobalStore } from "../lib/ctx/store";
import { RegisterReq } from "../lib/requests/register";

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    role: "MENTEE" | "MENTOR";
    resume?: [File]
}

const toBase64 = (f: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = error => reject(error);
});

const RegisterForm = () => {
    const { client, auth, setAuth } = useGlobalStore(s => ({ client: s.client, auth: s.auth, setAuth: s.setAuth }));
    const router = useRouter();
    const { register, handleSubmit, watch, reset } = useForm<RegisterForm>();
    const role = watch("role", "MENTEE");
    const onSubmit = handleSubmit(async (r) => {
        if (auth) return;

        const req = {
            name: r.name,
            email: r.email,
            password: r.password,
            ...(r.role == "MENTOR" ? { mentor: true } : {
                mentee: {
                   resume: await toBase64(r.resume![0])
                }
            }) 
        } as RegisterReqClient;

        const token = await registerUser(client, req);
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
            router.push("/dashboard");

    }, [auth, router])

    return (<>
        <Heading size={["2xl", "3xl"]}>Register</Heading>
        <Box width="100%">
            <form onSubmit={onSubmit}>
                <FormControl isRequired>
                    <FormLabel fontSize={["xl", "2xl"]}>Name</FormLabel>
                    <Input {...register("name")} py="1.8rem" size="lg"></Input>
                </FormControl>
                <FormControl isRequired mt="2">
                    <FormLabel fontSize={["xl", "2xl"]}>Email Address</FormLabel>
                    <Input {...register("email")} py="1.8rem" size="lg" type="email" placeholder="example@abc.com"></Input>
                </FormControl>
                <FormControl isRequired mt="2">
                    <FormLabel fontSize={["xl", "2xl"]}>Password</FormLabel>
                    <Input {...register("password")} py="1.8rem" size="lg" type="password" placeholder="Enter your password"></Input>
                </FormControl>
                <FormControl isRequired mt="2">
                    <FormLabel fontSize={["xl", "2xl"]}>Role</FormLabel>
                    <Select {...register("role")} placeholder="Role" py="1.8rem" size="lg" defaultValue="MENTEE">
                        <option value="MENTEE">Mentee</option>
                        <option value="MENTOR">Mentor</option>
                    </Select>
                </FormControl>
                <FormControl isRequired={role == "MENTEE"} mt="2" hidden={role != "MENTEE"}>
                    <FormLabel fontSize={["xl", "2xl"]}>Resume</FormLabel>
                    <Input {...register("resume")} size="lg" type="file" placeholder="Resume" variant="unstyled"></Input>
                </FormControl>
                <Button type="submit" width="full" variant="primary" mt="2rem" rounded="1rem">Sign Up</Button>
            </form>
        </Box>
    </>)
}

export default RegisterForm;