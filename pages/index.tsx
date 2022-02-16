import {
    List,
    UnorderedList,
    ListItem,
    Text,
    HStack,
    Collapse,
    VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import { Root } from "../components/Explorer/Root";
import { Dashboard } from "../components/Layout/Dashboard";
import { TurnTimeline } from "../components/TurnTimeline/TurnTimeline";
import data from "../public/example.json";
import { TurnDataProvider } from "../utils/turnData";

const Home: NextPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dashboard plane={true}>
            <TurnDataProvider turns={data.turns}>
                <VStack align="start">
                    <HStack minH="78vh" align={"start"}>
                        <Root {...data}></Root>
                    </HStack>
                    <TurnTimeline />
                </VStack>
            </TurnDataProvider>
        </Dashboard>
    );
};

export default Home;
