import type { AppProps } from 'next/app'
import { ChakraProvider, Flex } from '@chakra-ui/react';
import theme from "../theme";
import NavBar from '../components/NavBar';
import { useRouter } from 'next/router';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return <ChakraProvider theme={theme}>
        <Head>
          <title>PSoC 2022</title>
        </Head>
        <NavBar key={router.asPath}></NavBar>
        <Component  {...pageProps}/>
    </ChakraProvider>
}

export default MyApp
