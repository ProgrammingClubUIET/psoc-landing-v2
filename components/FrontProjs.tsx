import {  SimpleGrid, Heading, VStack, Image, Text, Center, Button, Flex, Spacer } from "@chakra-ui/react";
import { isLeft } from "fp-ts/lib/Either";
import NextLink from "next/link";
import { useContext, useEffect, useState } from "react";
import { getProjects } from "../lib/client/projects";
import { NotableContext } from "../lib/ctx/notable-ctx";
import { useGlobalStore } from "../lib/ctx/store";

const ProjIcon = (p: { iconPath: string, name: string }) => (
    <VStack key={p.iconPath}>
        <Image bg="auto" alt="Project Logo" boxSize={["6rem", "8rem", "11rem"]} src={p.iconPath} borderRadius="full"></Image>
        <Text color="white" fontWeight="bold">{p.name}</Text>
    </VStack>
);

const FrontProjs = () => {
    const client = useGlobalStore(c => c.client);
    const cache = useContext(NotableContext);
    const [projs, setProjs] = useState(cache.cache?.sort(() => Math.random() - 0.5).slice(0,4) || [
        {
            iconPath: "/img/project-logos/answer.svg",
            name: "!answer"
        },
        {
            iconPath: "/img/project-logos/pmeet.png",
            name: "PClub Meet"
        },
        {
            iconPath: "/img/project-logos/bundi.png",
            name: "Bundli Frontend"
        },
        {
            iconPath: "/img/project-logos/easyjobintern.png",
            name: "Easy Job Intern"
        }
    ]);

    useEffect(() => {
        if (cache.cache) return;

        (async () => {
            const projRes = await getProjects(client);
            if (isLeft(projRes)) return;

            cache.cache = projRes.right.map(p => ({ iconPath: p.logo, name: p.name }));
            setProjs(cache.cache.sort(() => Math.random() - 0.5).slice(0,4));
        })();
    }, [cache])

    return <SimpleGrid alignItems="center" justifyContent="center" columns={{sm: 1, lg: 2}} spacingY="4rem">
        <Text color="blue.600" fontSize={["4rem", "6rem", "8rem"]} textAlign="center" fontWeight="medium">Notable Projects</Text>
        <VStack bg="blue.700" py="4rem" spacing="2rem">
            <SimpleGrid columns={2} spacingX={["7rem", "10rem", '15rem']} spacingY="4rem" >
                {projs.map(ProjIcon)}
            </SimpleGrid>
            <NextLink href="/projects" passHref>
                <Button variant="primary">All Projects</Button>
            </NextLink>
        </VStack>
    </SimpleGrid>
};

export default FrontProjs;