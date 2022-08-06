import { AccordionItem, AccordionButton, AccordionPanel, HStack, Image, Text, Box, VStack, Button, AccordionIcon, Flex, Spacer, LinkOverlay, LinkBox, ButtonProps } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { FaGithub, FaCheckCircle } from "react-icons/fa";
import { ApplyProjectCtx } from "../lib/ctx/apply-ctx";
import { ProjectRes } from "../pages/api/projects";

const GithubTag = (p: { href: string }) => (
    <LinkBox>
        <Button rounded="full" leftIcon={ <FaGithub size="1.5rem"/> } colorScheme="blackAlpha" size="lg">
            <LinkOverlay href={p.href} isExternal>Github</LinkOverlay>
        </Button>
    </LinkBox>
)

export const ApplyTag = (p: {proj: ProjectRes } & ButtonProps) => {
    const applyProjectCtx = useContext(ApplyProjectCtx);
    const router = useRouter();
    const onClick = () => {
        applyProjectCtx.cache = p.proj;
        router.push(`/apply/${p.proj.id}`)
    }

    return <Button
        rounded="full"
        leftIcon={ <FaCheckCircle size="1.5rem"/> }
        colorScheme="lgreen"
        size="lg"
        onClick={onClick}
        {...p}
    >
        Apply
    </Button>
}

export type ProjectButton = (p: {proj: ProjectRes }) => JSX.Element;

const ProjectMini = (proj: ProjectRes, rightButton?: ProjectButton, hideAuthor?: boolean) => {
    return <AccordionItem key={proj.id}>
        <AccordionButton>
            <HStack alignItems="flex-start" spacing="4rem" width="full" p="2rem">
                <Image alt="Project Logo" borderRadius="full" boxSize="5em" src={proj.logo}></Image>
                <Box textAlign="start">
                    <Text fontSize="3xl">{proj.name}</Text>
                    <Text hidden={hideAuthor} color="gray.600" fontSize="md">{proj.mentorName}</Text>
                </Box>
            </HStack>
            <AccordionIcon fontSize="lg"></AccordionIcon>
        </AccordionButton>
        <AccordionPanel>
            <VStack alignItems="flex-start" spacing="2rem" pt="1rem" px="2rem">
                <Flex width="full">
                    <GithubTag href={proj.url}></GithubTag>
                    <Spacer hidden={rightButton == undefined}></Spacer>
                    {rightButton && rightButton({proj})}
                </Flex>
                <Text fontSize="xl">{proj.description}</Text>
            </VStack>
        </AccordionPanel>
    </AccordionItem>
};

export default ProjectMini;