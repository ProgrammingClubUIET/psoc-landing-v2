import { VStack, HStack, Heading, Text, Icon, Box } from "@chakra-ui/react";
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
    <VStack width="full" bg="gray.100" py="8rem" spacing="20">
        <Heading color="blue.700" size="3xl">How Does It Work?</Heading>
        <HStack spacing="40">
            <InfoBox head="Apply" desc="Interested mentees propose a project." icon={FaFileInvoice}>
            </InfoBox>
            <InfoBox head="Code" desc="Selected mentees, work on their project. mentees propose a project." icon={FaCode}>
            </InfoBox>
            <InfoBox icon={FaGlobeAsia} head="Contribute" desc="Contribute your work with the Open-Source community. mentees propose a project.">
            </InfoBox>
        </HStack>
    </VStack>
);

export default WorkSection