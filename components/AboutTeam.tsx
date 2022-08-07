import { Heading, SimpleGrid, VStack, Image, Text, HStack, Icon, Link } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const TEAM = [
    {
        img: "/img/team/abhiroop.jpg",
        name: "Abhiroop Singh",
        desig: "Marketing",
        social: {
            linkedin: "https://www.linkedin.com/in/abhiroop-singh-a50460200/",
            email: "abhiroopsk@gmail.com",
            github: "https://github.com/abhiroopsk"
        }
    },
    {
        img: "/img/team/aditi.jpg",
        name: "Aditi Shandyal",
        desig: "Content Writing",
        social: {
            linkedin: "https://www.linkedin.com/in/aditi-shandyal-2b9685203/",
            github: "https://github.com/17aditi1201"
        }
    },
    {
        img: "/img/team/meghna.png",
        name: "Meghna Thakur",
        desig: "Graphics, Web Developer",
        social: {
            linkedin: "https://www.linkedin.com/in/thakur-meghna/",
            email: "meghnathakur2001@gmail.com",
            github: "https://github.com/thakur-meg"
        }
    },
    {
        img: "/img/team/ritvik.jpg",
        name: "Ritvik Gupta",
        desig: "Web Developer",
        social: {
            github: "https://github.com/theseus-alt",
            linkedin: "https://www.linkedin.com/in/ritvik-gupta-a6196a1bb",
            email: "ritvikgupta75@gmail.com",

        }
    },
    {
        img: "/img/team/rik.jpg",
        name: "Shatabarto Bhattacharya",
        desig: "Web Developer",
        social: {
            github: "https://github.com/hrik2001",
            linkedin: "https://www.linkedin.com/in/shatabarto-bhattacharya-6bb6ba149/",
            twitter: "https://twitter.com/riksucks",
            email: "rik61072@gmail.com",
        }
    },
    {
        img: "/img/team/yuvraj.jpg",
        name: "Yuvraj Bind",
        desig: "Web Developer",
        social: {
            github: "https://github.com/U-A-V",
            linkedin: "https://www.linkedin.com/in/yuvraj-bind-14616120a/",
            twitter: "https://twitter.com/yu_a_vi",
            email: "uav0108@gmail.com",
        }
    },
    {
        img: "/img/team/rishabh.jpg",
        name: "Rishabh Verma",
        desig: "Web Developer",
        social: {
            github: "https://github.com/rishabhverma-spec",
            linkedin: "https://www.linkedin.com/in/rishabh-verma-7a98a5200/",
            twitter: "https://twitter.com/RyuV_8085",
            email: "ue208085.rishabhverma.it@gmail.com",
        }
    }
];

const MaybeIcon = (k: number, icon: IconType, href?: string) => {
    if (href)
        return [() => (
            <Link href={href} key={k}>
                <Icon as={icon} fontSize="1.5rem"></Icon>
            </Link>
        )]

    return []
}

const MemberCard = (p: { i: number, img: string, name: string, desig: string, social: {
    github?: string,
    linkedin?: string,
    twitter?: string,
    email?: string
} }) => {
    const icons = [
        MaybeIcon(0, FaGithub, p.social.github),
        MaybeIcon(1, FaLinkedin, p.social.linkedin),
        MaybeIcon(2, FaTwitter, p.social.twitter),
        MaybeIcon(3, FaEnvelope, p.social.email)
    ].flat();

    return <VStack key={p.i} bg="gray.100" py="1rem" borderRadius="1rem" textAlign="center">
        <Image alt="Member Image" borderRadius="full" boxSize="7rem" src={p.img}></Image>
        <Heading color="blue.700">{p.name}</Heading>
        <Text fontSize="2xl">{p.desig}</Text>
        <HStack spacing="2rem">
            {icons.map(v => v())}
        </HStack>
    </VStack>
}

const AboutTeam = () => (
    <VStack spacing="3rem" py="4rem">
        <Heading size="4xl" color="blue.600">PSoC Team</Heading>
        <SimpleGrid columns={[1, 2, 3]} spacingY="3rem" spacingX="1rem">
            {TEAM.map((v, i) => MemberCard({ i, ...v }))}
        </SimpleGrid>
    </VStack>
);


export default AboutTeam;