import {
    HStack,
    ListItem,
    UnorderedList,
    VStack,
    Text,
    Collapse,
    Button,
    useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { ms_time } from "../../utils/ms_time";
import { statusPick } from "../../utils/theme";
import { useTurnData } from "../../utils/turnData";
import { ObjectShow } from "../Layout/ObjectShow";
import { Block, BlockProps } from "./Block";

export interface RootProps {
    _id: number;
    _type: string;
    root?: BlockProps;
    turns?: { debug: []; data: []; annotations: [] }[] | any;
    debug?: {
        time: number;
    };
}

export function Root(props: RootProps) {
    const [isOpen, setIsOpen] = useState(true);
    const { active } = useTurnData();
    const { colorMode } = useColorMode();
    return (
        <VStack py="5" alignItems={"start"} height={"full"} overflowY="scroll">
            <UnorderedList listStyleType={"none"} mx={"unset"} w="full">
                <ListItem my="0.5">
                    <HStack
                        onClick={(e) => {
                            setIsOpen(!isOpen);
                        }}
                        py="1"
                        px="4"
                        mb="2"
                        borderLeft={"4px"}
                        borderColor={
                            active?.debug[props._id]
                                ? statusPick[active.debug[props._id].status]
                                : "transparent"
                        }
                    >
                        <Text fontWeight={"bold"} cursor="pointer">
                            DecisionLogic
                        </Text>
                        {active && active.debug[props._id] && (
                            <Text color="gray.500" pl="1">
                                {ms_time(active.debug[props._id].time)}
                            </Text>
                        )}
                    </HStack>
                    <Collapse in={isOpen}>
                        <UnorderedList listStyleType={"none"} ml="8">
                            {props.root && <Block {...props.root}></Block>}
                        </UnorderedList>
                    </Collapse>
                </ListItem>
                {active && active.data && (
                    <>
                        <ListItem
                            my="5"
                            borderBottom="1px"
                            borderBottomColor={
                                colorMode == "light"
                                    ? "gray.300"
                                    : "whiteAlpha.300"
                            }
                            w="full"
                        />
                        <ListItem my="0.5">
                            <ObjectShow
                                obj={active.data.players.me}
                                title="Me"
                            />
                        </ListItem>
                        <ListItem my="0.5">
                            <ObjectShow
                                obj={active.data.players.opponents}
                                title="Opponents"
                            />
                        </ListItem>
                    </>
                )}
            </UnorderedList>
        </VStack>
    );
}
