import {
    HStack,
    ListItem,
    UnorderedList,
    VStack,
    Text,
    Collapse,
    Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { ms_time } from "../../utils/ms_time";
import { statusPick } from "../../utils/theme";
import { useTurnData } from "../../utils/turnData";
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
    return (
        <VStack p="4" px="6">
            <UnorderedList listStyleType={"none"} mx={"unset"}>
                <ListItem my="0.5">
                    <HStack
                        onClick={(e) => {
                            setIsOpen(!isOpen);
                        }}
                        py="1"
                        px="4"
                        mb="2"
                        borderLeft={"4px"}
                        borderRadius={"base"}
                        borderColor={
                            active?.debug[props._id]
                                ? statusPick[active.debug[props._id].status]
                                : "transparent"
                        }
                    >
                        <Text fontWeight={"bold"}>DecisionLogic</Text>
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
            </UnorderedList>
        </VStack>
    );
}
