import type { AppProps } from 'next/app'
import { ChakraProvider, Flex } from '@chakra-ui/react';
import theme from "../theme";
import NavBar from '../components/NavBar';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return <ChakraProvider theme={theme}>
        <Head>
          <title>PSoC 2022</title>
        </Head>
        <NavBar key={router.asPath}></NavBar>
        <Component  {...pageProps}/>
        <Footer></Footer>
    </ChakraProvider>
}

export default MyApp
