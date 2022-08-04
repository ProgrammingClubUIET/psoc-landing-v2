import { Center, CenterProps, Spinner } from "@chakra-ui/react";

const CenterSpinner =  (p: CenterProps) => (
    <Center {...p}>
        <Spinner size="xl"></Spinner>
    </Center>
);


export default CenterSpinner;