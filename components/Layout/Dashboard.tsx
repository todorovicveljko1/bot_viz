import { VStack, Box } from "@chakra-ui/react";
import { Navbar } from "../Nav/Navbar";

export interface DashboardProps {
    children?: JSX.Element | JSX.Element | string | string[];
    plane?: boolean;
}

export function Dashboard(props: DashboardProps) {
    return (
        <VStack spacing="0" align="stretch" overflow={"hidden"}>
            <Navbar />
            {props.plane ? (
                <Box mt="8">{props.children}</Box>
            ) : (
                <Box p="4" pt="2">
                    {props.children}
                </Box>
            )}
        </VStack>
    );
}
