import { VStack, Text, Tabs, Tab, TabList, TabPanels, TabPanel, Icon, Slide, Box } from "@chakra-ui/react";
import { FaQuoteLeft, FaCircle  } from "react-icons/fa";

// TODO: animate
const TestimonialTab = (p: { desc: string, name: string, i: number }) => (
    <TabPanel key={p.i}>
        <VStack height="40vh" width="40vw" bg="gray.100" py="2rem" px="8rem" borderRadius="3rem" spacing={5}>
            <Icon as={FaQuoteLeft} boxSize="3.5em" color="gray.400"></Icon>
            <Box boxSize="30em">
                <Text fontSize="2xl" fontWeight="bold" align="center">{p.desc}</Text>
            </Box>
            <Text fontSize="3xl" align="center" fontWeight="extrabold" color="gray.500">{p.name}<br/>Student</Text>
        </VStack>
    </TabPanel>
)

const TESTIMONIALS = [
    {
        name: "Gaurika",
        desc: "It was a great opportunity to learn many new things. It also gave me an insight into the open source community."
    },
    {
        name: "Diksha Mahajan",
        desc: "Thus it was a journey where I learned a lot and spent time implementing it."
    },
    {
        name: "Aditi Shandayal",
        desc: "Through this project, I gained a lot of experience and came across new things."
    }
];

const Testimonials = () => {
    return (
        <VStack width="full" py="4rem">
            <Text fontSize="5xl" color="blue.700">Testiomonials</Text>
            <Box boxSize="0.25rem" width="8rem" bg="blue.700"></Box> 
            <Tabs variant="soft-rounded" orientation="horizontal" width="full" align="center">
                <TabPanels>
                    {TESTIMONIALS.map((v, i) => TestimonialTab({ ...v, i }))}
                </TabPanels>
                <TabList>
                    <Tab key={0}><Icon as={FaCircle} boxSize="0.8em"></Icon></Tab>
                    <Tab key={1}><Icon as={FaCircle} boxSize="0.8em"></Icon></Tab>
                    <Tab key={2}><Icon as={FaCircle} boxSize="0.8em"></Icon></Tab>
                </TabList>
            </Tabs>
        </VStack>
    )
};

export default Testimonials;