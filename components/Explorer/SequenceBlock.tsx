import {
    HStack,
    UnorderedList,
    ListItem,
    Text,
    Collapse,
} from "@chakra-ui/react";
import { useState } from "react";
import { ms_time } from "../../utils/ms_time";
import { statusPick } from "../../utils/theme";
import { useTurnData } from "../../utils/turnData";
import { BlockProps, Block } from "./Block";

export interface SequenceBlockProps extends BlockProps {}

export function SequenceBlock(props: SequenceBlockProps) {
    const [isOpen, setIsOpen] = useState(true);
    const { active } = useTurnData();
    return (
        <ListItem py="0.5">
            <HStack
                alignItems={"start"}
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
                <Text fontWeight={"bold"}>Sequence</Text>
                {active && active.debug[props._id] && (
                    <Text color="gray.500" pl="1">
                        {ms_time(active.debug[props._id].time)}
                    </Text>
                )}
            </HStack>
            <Collapse in={isOpen}>
                <UnorderedList listStyleType={"none"} ml="8">
                    {props.childrens?.map((v) => (
                        <Block key={v._id} {...v}></Block>
                    ))}
                </UnorderedList>
            </Collapse>
        </ListItem>
    );
}
