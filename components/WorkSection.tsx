import { VStack, HStack, Heading, Text, Icon, Box, SimpleGrid } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { FaFileInvoice, FaCode, FaGlobeAsia } from "react-icons/fa"
import { IconType } from "react-icons/lib";

const InfoBox = (p: { icon: IconType, head: string, desc: string } & PropsWithChildren ) => (
    <VStack bg="white" borderRadius="1rem" pt="10" px="8" boxSize="20rem" h="22rem" color="blue.600" spacing="5" alignItems="flex-start" boxShadow="2xl">
        <Icon boxSize="3.5em" as={p.icon}></Icon>
        <Heading>{p.head}</Heading>
        <Text fontSize="xl">{p.desc}</Text>
    </VStack> 
)

const WorkSection = () => (
    <VStack bg="gray.100" py="8rem" px="4rem" spacing="20">
        <Heading color="blue.700" size="3xl">How Does It Work?</Heading>
        <SimpleGrid spacing={[10, 20, 40]} columns={{sm: 1, md: 3}}>
            <InfoBox head="Apply" desc="Interested mentees propose a project." icon={FaFileInvoice}>
            </InfoBox>
            <InfoBox head="Code" desc="Selected mentees, work on their project. mentees propose a project." icon={FaCode}>
            </InfoBox>
            <InfoBox icon={FaGlobeAsia} head="Contribute" desc="Contribute your work with the Open-Source community. mentees propose a project.">
            </InfoBox>
        </SimpleGrid>
    </VStack>
);

export default WorkSection