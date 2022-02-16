import {
    HStack,
    UnorderedList,
    ListItem,
    Text,
    Collapse,
    Code,
    Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import { ms_time } from "../../utils/ms_time";
import { statusPick } from "../../utils/theme";
import { useTurnData } from "../../utils/turnData";
import { BlockProps } from "./Block";

export interface ActionBlockProps extends BlockProps {}

export function ActionBlock(props: ActionBlockProps) {
    const [isOpen, setIsOpen] = useState(true);
    const { active } = useTurnData();
    return (
        <ListItem py="0.5">
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
                {props.children}
                <Text fontWeight={"bold"}>Action </Text>
                <Code px="2" fontSize="md">
                    {props.method}
                </Code>
                {active && active.debug[props._id] && (
                    <Text color="gray.500">
                        {ms_time(active.debug[props._id].time)}
                    </Text>
                )}
            </HStack>
        </ListItem>
    );
}
