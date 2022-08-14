import { Grid, HStack, Icon, SimpleGrid, GridItem, Text, VStack, LinkBox, LinkOverlay, Box } from "@chakra-ui/react";
import { FaEnvelope, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IconType } from "react-icons/lib";

const FIcon = (p: { as: IconType, text: string, href: string, isExternal?: boolean }) => <Box width={{base: "8rem", md: "auto"}}>
    <LinkBox>
        <HStack width="full" _hover={{color: "gray.200"}}>
                <Icon as={p.as} fontSize="4xl"></Icon>
                <Text fontSize={{base: "lg", md: "2xl", lg: "3xl"}}>
                    <LinkOverlay href={p.href} isExternal={p.isExternal != undefined ? p.isExternal : true}>{p.text}</LinkOverlay>
                </Text>
        </HStack>
    </LinkBox>
</Box>

const Footer = () => <VStack color="white" bg="blue.700" py="1rem">
    <Text fontSize={{base: "2xl", lg: "4xl"}}>Contact Us!</Text>
    <HStack fontSize="md" gap="1rem" wrap="wrap" justifyContent="center">
        <FIcon as={FaTwitter} href="https://twitter.com/PClubUIET" text="Twitter" />
        <FIcon as={FaInstagram} href="https://www.instagram.com/pclubuiet/" text="Instagram"/>
        <FIcon as={FaLinkedin} href="https://www.linkedin.com/company/pclubbuiet/" text="LinkedIn"/>
        <FIcon as={FaEnvelope} href="mailto:pclubuiet@gmail.com" text="Email" isExternal={false} />
    </HStack>
</VStack>


export default Footer;