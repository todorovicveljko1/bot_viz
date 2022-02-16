import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { TurnDataProvider } from "../utils/turnData";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <TurnDataProvider>
                <Component {...pageProps} />
            </TurnDataProvider>
        </ChakraProvider>
    );
}

export default MyApp;
