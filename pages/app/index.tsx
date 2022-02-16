import { HStack, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Root } from "../../components/Explorer/Root";
import { Dashboard } from "../../components/Layout/Dashboard";
import { TurnTimeline } from "../../components/TurnTimeline/TurnTimeline";
import data from "../../public/example.json";
import { useTurnData } from "../../utils/turnData";

const Home: NextPage = () => {
    const { root } = useTurnData();
    return (
        <Dashboard plane={true}>
            <VStack align="start">
                <HStack minH="78vh" align={"start"}>
                    <Root _id={0} _type="DecisionLogic" root={root}></Root>
                </HStack>
                <TurnTimeline />
            </VStack>
        </Dashboard>
    );
};

export default Home;
