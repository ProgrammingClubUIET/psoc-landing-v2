import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { MenteeInfo } from "../pages/api/mentor/project-mentees";

const MenteeMini = (m: MenteeInfo, i: number) => {
    return <HStack alignItems="flex-start" spacing="4rem" width="full" p="2rem" key={i}>
        <Image borderRadius="full" boxSize="5em" src={m.project.logo}></Image>
        <Box textAlign="start">
            <Text fontSize="3xl">{m.name}</Text>
            <Text color="gray.600" fontSize="md">{m.project.name}</Text>
        </Box>
    </HStack>
}

export default MenteeMini;