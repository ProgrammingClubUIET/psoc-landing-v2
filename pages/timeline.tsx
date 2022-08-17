import { Flex, VStack, Heading, Box, Center, Text } from "@chakra-ui/react";
import { NextPage } from "next";

const TIMELINE = [
  {
    date: new Date(2022, 5, 12),
    desc: "Mentor Registration Starts",
  },
  {
    date: new Date(2022, 6, 10),
    desc: "Mentor Registration Ends",
  },
  {
    date: new Date(2022, 7, 17),
    desc: "Proposal Submission Begins",
  },
  {
    date: new Date(2022, 7, 23),
    desc: "Proposal Submission Ends",
  },
  {
    date: new Date(2022, 7, 24),
    desc: "Project Proposal Evaluation Begins",
  },
  {
    date: new Date(2022, 7, 27),
    desc: "Project Proposal Evaluation Ends",
  },
  {
    date: new Date(2022, 7, 28),
    desc: "Selected Mentees List Out",
  },
  {
    date: new Date(2022, 7, 29),
    desc: "Interaction Period/Setup Time",
  },
  {
    date: new Date(2022, 8, 1),
    desc: "Coding Begins",
  },
  {
    date: new Date(2022, 9, 15),
    desc: "Coding Ends",
  },
  {
    date: new Date(2022, 9, 16),
    desc: "Final Presentaion",
  },
  {
    date: new Date(2022, 9, 18),
    desc: "Certificate Distribution",
  },
];

// TODO: Show number
const EvBox = (p: { n: number; date: Date; desc: string }) => {
  const det = p.n % 2 == 1;
  const alignItems = det ? "flex-end" : "flex-start";
  const borderTop = p.n == 1 ? "none" : "dashed";
  const borderR = det ? "dashed" : "none";
  const borderL = det ? "none" : "dashed";
  const borderSize = "2rem";
  let botLRad = det ? "0" : borderSize;
  const botRRad = det ? borderSize : "0";
  const topLRad = det ? "0" : borderSize;
  const topRRad = det && p.n != 1 ? borderSize : "0";
  const marginR = det ? "0" : "2rem";
  const marginL = det ? "2rem" : "0";
  const iconL = det ? "auto" : "0";
  const iconR = det ? "0" : "auto";

  if (p.n == TIMELINE.length) botLRad = "0";

  return (
    <VStack
      px="2rem"
      py="4rem"
      alignItems={alignItems}
      borderTop={borderTop}
      borderLeft={borderL}
      borderRight={borderR}
      borderBottom="none"
      borderWidth="2px"
      borderBottomRightRadius={botRRad}
      borderBottomLeftRadius={botLRad}
      borderTopRightRadius={topRRad}
      borderTopLeftRadius={topLRad}
      marginRight={marginR}
      marginLeft={marginL}
      key={p.n}
      direction="column"
    >
      <Text fontSize="xl" fontWeight="semibold">
        {p.date.toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Text>
      <Text fontSize="2xl">{p.desc}</Text>
      {/* <Center borderRadius="full" boxSize="2rem" bg="white" color="blue.400" top="50%" left={iconL} right={iconR} transform="translate(-50%, -50%)" position="relative">
            <Text>{p.n}</Text>
        </Center> */}
    </VStack>
  );
};

const Timeline: NextPage = () => (
  <Flex
    bg="blue.600"
    width="100%"
    pt="6rem"
    color="white"
    direction="column"
    alignItems="center"
  >
    <Heading size="4xl">Timeline</Heading>
    <Box boxSize="0.25em" width="12rem" bg="white"></Box>
    <Flex direction="column" py="5rem" px="1rem">
      {TIMELINE.map((v, i) => EvBox({ n: i + 1, ...v }))}
    </Flex>
  </Flex>
);

export default Timeline;
