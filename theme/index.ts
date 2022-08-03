import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        lgreen: {
            50: '#F1F8E9',
            100: '#DCEDC8',
            200: '#C5E1A5',
            300: '#9CCC65',
            400: '#7CB342',
            500: '#66BB30',
            600: '#5C982E',
            700: '#558B2F',
            800: '#4E742C',
            900: '#3E6B26'
        }
    },
    components: {
        Button: {
            variants: {
                primary: {
                    _hover: {
                        bg: 'lgreen.400'
                    },
                    bg: "lgreen.300",
                    color: "white",
                    px: 4,
                    py: 8,
                    fontSize: 'xl'
                }
            }
        }
    }
});

export default theme;