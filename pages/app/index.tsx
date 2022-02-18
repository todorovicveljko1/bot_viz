import { HStack, VStack, Grid, GridItem, useColorMode } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Root } from "../../components/Explorer/Root";
import { Dashboard } from "../../components/Layout/Dashboard";
import { SVGBase } from "../../components/SVGRenderer/SVGBase";
import { TurnTimeline } from "../../components/TurnTimeline/TurnTimeline";
import data from "../../public/example.json";
import { useTurnData } from "../../utils/turnData";

const Home: NextPage = () => {
    const { root } = useTurnData();
    const { colorMode } = useColorMode();
    return (
        <Dashboard plane={true}>
            <VStack align="start">
                <Grid
                    minH="78vh"
                    maxH="78vh"
                    width="full"
                    templateColumns="repeat(3, 1fr)"
                    borderBottom="1px"
                    borderBottomColor={
                        colorMode == "light" ? "gray.300" : "whiteAlpha.300"
                    }
                >
                    <GridItem
                        colSpan={2}
                        borderRight="1px"
                        borderRightColor={
                            colorMode == "light" ? "gray.300" : "whiteAlpha.300"
                        }
                        minH={0}
                    >
                        <SVGBase></SVGBase>
                    </GridItem>
                    <GridItem minH={0}>
                        <Root _id={0} _type="DecisionLogic" root={root}></Root>
                    </GridItem>
                </Grid>
                <TurnTimeline />
            </VStack>
        </Dashboard>
    );
};

export default Home;
