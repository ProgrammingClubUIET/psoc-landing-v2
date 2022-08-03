import { Button, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react"

const ProposalForm = (p: { projectId: string }) => {
    return (<form>
        <FormControl>
            <FormLabel fontSize="xl">Proposal</FormLabel>
            <Textarea minHeight="15vh" size="lg" placeholder="Why should you be selected?"></Textarea>
        </FormControl>
        <Button mt="3rem" variant="primary" width="full">Submit</Button>
    </form>)
}

export default ProposalForm;;