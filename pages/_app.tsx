import type { AppProps } from 'next/app'
import { ChakraProvider, Flex } from '@chakra-ui/react';
import theme from "../theme";
import NavBar from '../components/NavBar';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ChakraProvider theme={theme}>
      <Flex>
        <NavBar key={router.asPath}></NavBar>
        <Component {...pageProps}/>
      </Flex>
    </ChakraProvider>
  )
}

export default MyApp
