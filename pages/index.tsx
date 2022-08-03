import { Container, Flex, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Hero from "../components/Hero";
import FrontStats from '../components/FrontStats';
import WorkSection from '../components/WorkSection';
import FrontProjs from '../components/FrontProjs';
import Testimonials from '../components/Testimonials';

const Home: NextPage = () => {
  return (
    <VStack width="full" alignItems="flex-start" spacing="0">
      <Hero></Hero>
      <FrontStats></FrontStats>
      <WorkSection></WorkSection>
      <FrontProjs></FrontProjs>
      <Testimonials></Testimonials>
    </VStack>
  )
}

export default Home
