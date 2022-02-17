import {
    HStack,
    useColorMode,
    Box,
    IconButton,
    useToast,
} from "@chakra-ui/react";
import { DownloadIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import Dropzone, { DropzoneRef } from "react-dropzone";
import { useTurnData } from "../../utils/turnData";
import { createRef } from "react";

export interface NavbarProps {}

export function Navbar(props: NavbarProps) {
    const { colorMode, toggleColorMode } = useColorMode();
    const dropzoneRef = createRef<DropzoneRef>();
    const openDialog = () => {
        // Note that the ref is set async,
        // so it might be null at some point
        console.log(dropzoneRef.current);
        if (dropzoneRef.current) {
            dropzoneRef.current.open();
        }
    };

    const { newFile } = useTurnData();
    const toast = useToast({ position: "bottom-left" });
    return (
        <HStack
            align="stretch"
            alignItems="center"
            justifyContent="space-between"
            px="4"
            py="2"
            borderBottomWidth="1px"
            borderBottomColor={
                colorMode == "light" ? "gray.300" : "whiteAlpha.300"
            }
        >
            <Box fontSize="lg">DecisionViz</Box>
            <HStack>
                <Dropzone
                    ref={dropzoneRef}
                    onDrop={(acceptedFiles) => {
                        if (acceptedFiles[0])
                            acceptedFiles[0]
                                .text()
                                .then((v) => JSON.parse(v))
                                .then((v) => {
                                    if (!!!v.turns || !!!v.root) {
                                        toast({
                                            title: "JSON file format error",
                                            description:
                                                "exprects turns and root keys in json file",
                                            duration: 3000,
                                            status: "error",
                                            variant: "top-accent",
                                        });
                                    }

                                    newFile(v);
                                })
                                .catch(() => {
                                    toast({
                                        title: "JSON file error",
                                        description:
                                            "error while parsing json file",
                                        duration: 3000,
                                        status: "error",
                                        variant: "top-accent",
                                    });
                                });
                    }}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({ className: "dropzone" })}>
                            <IconButton
                                aria-label="toggle-color-mode"
                                icon={
                                    <DownloadIcon
                                        transform={"rotate(0.5turn)"}
                                    />
                                }
                            ></IconButton>{" "}
                            <input {...getInputProps()}></input>
                        </div>
                    )}
                </Dropzone>
                <IconButton
                    aria-label="toggle-color-mode"
                    icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                    onClick={toggleColorMode}
                ></IconButton>
            </HStack>
        </HStack>
    );
}
