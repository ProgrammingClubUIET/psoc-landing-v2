import { VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import AboutHero from "../components/AboutHero";
import AboutText from "../components/AboutText";
import AboutTeam from "../components/AboutTeam";

const ABOUT_TEXT = [
    {
        heading: "What is PSoC?",
        text: "Pclub Summer of Code is a two-month-long open-source programme conducted by Pclub UIET every summer. PSoC has completed two years of educating young minds through robust initiatives and real world projects. We strive to be a community where students can polish and grow their technical skills, as well as a place where beginners can get started with open source development while encouraging diversity."
    },
    {
        heading: "About PClub",
        text: "Pclub is a community of students who are highly enthusiastic about coding, web development and all other aspects of programming. Pclub was established in 2017. Since then it has been conducting sessions, webinars and group discussions in order to share ample information and build strong network. With each passing year it is coming out with flying colours and achieving new heights. Pclub organises various activities and open source projects like software freedom day,hacktober,AIsaturdays Psoc which encourages a lot of students to contribute and gain knowledge."
    }
]

const About: NextPage = () => (
    <VStack width="full">
        <AboutHero></AboutHero>
        {ABOUT_TEXT.map((v, i) => AboutText({...v, key: i }))}
        <AboutTeam></AboutTeam>
    </VStack>
)


export default About;