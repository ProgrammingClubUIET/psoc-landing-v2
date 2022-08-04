import { Button, FormControl, FormLabel, Textarea } from "@chakra-ui/react"
import { isLeft } from "fp-ts/lib/Either";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { applyToProject } from "../lib/client/mentee";
import { useGlobalStore } from "../lib/ctx/store";

const ProposalForm = (p: { projectId: string }) => {
    const { register, handleSubmit } = useForm<{ application: string }>();
    const client = useGlobalStore(s => s.client);
    const router = useRouter();

    const onSubmit = handleSubmit(async (r) => {
        await applyToProject(client, { projectId: p.projectId, application: r.application });
        // TODO: goto dashboard
        router.push("/");
    })

    return (<form onSubmit={onSubmit}>
        <FormControl>
            <FormLabel fontSize="xl">Proposal</FormLabel>
            <Textarea {...register("application")} minHeight="15vh" size="lg" placeholder="Why should you be selected?"></Textarea>
        </FormControl>
        <Button type="submit" mt="3rem" variant="primary" width="full">Submit</Button>
    </form>)
}

export default ProposalForm;;