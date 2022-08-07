import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { MenteeInfo } from "../pages/api/mentor/project-mentees";

const MenteeMini = (m: MenteeInfo, i: number) => {
    return <HStack alignItems="flex-start" spacing={["1rem", "2rem", "4rem"]} width="full" p={["1rem", "2rem"]} key={i}>
        <Image alt="Project Logo" borderRadius="full" boxSize="5em" src={m.project.logo}></Image>
        <Box textAlign="start">
            <Text fontSize={["2xl", null, "3xl"]}>{m.name}</Text>
            <Text color="gray.600" fontSize="md">{m.project.name}</Text>
        </Box>
    </HStack>
}

export default MenteeMini;