import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
    HStack,
    useColorMode,
    Box,
    IconButton,
    VStack,
    Button,
} from "@chakra-ui/react";
import { useTurnData } from "../../utils/turnData";

export interface TurnTimelineProps {}

export function TurnTimeline(props: TurnTimelineProps) {
    const { turn, nextTurn, prevTurn, turns, setTurn } = useTurnData();
    const { colorMode } = useColorMode();
    const c =
        colorMode == "light"
            ? ["gray.300", "gray.100", "gray.200"]
            : ["whiteAlpha.400", "whiteAlpha.200", "whiteAlpha.300"];
    return (
        <VStack
            align="center"
            alignSelf={"center"}
            alignItems="center"
            px="4"
            py="2"
        >
            <HStack
                justifyContent={"center"}
                alignItems="center"
                fontWeight={"medium"}
            >
                {turns &&
                    Array(25)
                        .fill(0)
                        .map((k, i) => (
                            <Box
                                as={Button}
                                key={turn + i - 12}
                                bgColor={i == 12 ? c[0] : c[1]}
                                _hover={{
                                    bgColor: c[2],
                                }}
                                py="1"
                                minW="16"
                                textAlign={"center"}
                                borderRadius="md"
                                size="sm"
                                onClick={() => setTurn(turn + i - 12)}
                                opacity={
                                    turn + i - 12 < 0 ||
                                    turn + i - 12 >= turns.length
                                        ? 0
                                        : 100
                                }
                            >
                                {turn + i - 12}
                            </Box>
                        ))}
            </HStack>
            <HStack>
                <IconButton
                    aria-label="prev"
                    icon={<ArrowLeftIcon />}
                    size="sm"
                    onClick={prevTurn}
                ></IconButton>
                <IconButton
                    aria-label="prev"
                    icon={<ArrowRightIcon />}
                    size="sm"
                    onClick={nextTurn}
                ></IconButton>
            </HStack>
        </VStack>
    );
}
