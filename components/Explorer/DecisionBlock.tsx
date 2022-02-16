import {
    HStack,
    UnorderedList,
    ListItem,
    Text,
    Collapse,
    Tag,
    Code,
    Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import { ms_time } from "../../utils/ms_time";
import { statusPick } from "../../utils/theme";
import { useTurnData } from "../../utils/turnData";
import { BlockProps, Block } from "./Block";

export interface DecisionBlockProps extends BlockProps {}

export function DecisionBlock(props: DecisionBlockProps) {
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
                <Text fontWeight={"bold"}>Decision </Text>
                <Code px="2" fontSize={"md"}>
                    {props.method}
                </Code>{" "}
                {active && active.debug[props._id] && (
                    <Text color="gray.500" pl="1">
                        {ms_time(active.debug[props._id].time)}
                    </Text>
                )}
            </HStack>
            <Collapse in={isOpen}>
                <UnorderedList listStyleType={"none"} ml="8">
                    {props.childrens && props.childrens[0] && (
                        <HStack alignItems="start">
                            <Block {...props.childrens[0]}>
                                <Badge
                                    fontSize={"md"}
                                    mr="1"
                                    ml="-1"
                                    w="20px"
                                    textAlign={"center"}
                                    colorScheme={"green"}
                                >
                                    T
                                </Badge>
                            </Block>
                        </HStack>
                    )}
                    {props.childrens && props.childrens[1] && (
                        <HStack alignItems="start">
                            <Block {...props.childrens[1]}>
                                <Badge
                                    fontSize={"md"}
                                    mr="1"
                                    ml="-1"
                                    w="20px"
                                    textAlign={"center"}
                                    colorScheme={"red"}
                                >
                                    F
                                </Badge>
                            </Block>
                        </HStack>
                    )}
                </UnorderedList>
            </Collapse>
        </ListItem>
    );
}
