import {
    HStack,
    Text,
    Collapse,
    UnorderedList,
    ListItem,
} from "@chakra-ui/react";
import { useState } from "react";

export interface ObjectShowProps {
    obj: { [key: string]: any };
    title: string;
}

export function ObjectShow(props: ObjectShowProps) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <>
            <HStack
                onClick={(e) => {
                    setIsOpen(!isOpen);
                }}
                py="1"
                px="4"
                mb="2"
                borderLeft={"4px"}
                borderColor="cyan.700"
            >
                <Text fontWeight={"bold"} cursor="pointer">
                    {props.title}
                </Text>
            </HStack>
            <Collapse in={isOpen}>
                <UnorderedList listStyleType={"none"} ml="8">
                    {Object.keys(props.obj).map((key) => (
                        <ListItem key={key}>
                            {typeof props.obj[key] === "object" ? (
                                <ObjectShow obj={props.obj[key]} title={key} />
                            ) : (
                                <Text>
                                    {key}: {props.obj[key]}
                                </Text>
                            )}
                        </ListItem>
                    ))}
                </UnorderedList>
            </Collapse>
        </>
    );
}
