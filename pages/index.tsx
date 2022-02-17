import { Text, HStack, VStack, Box, useToast } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Dashboard } from "../components/Layout/Dashboard";
import Dropzone from "react-dropzone";
import { useTurnData } from "../utils/turnData";
import { useRouter } from "next/router";

const Home: NextPage = () => {
    const { newFile } = useTurnData();
    const toast = useToast({ position: "bottom-left" });
    const router = useRouter();
    return (
        <Dashboard plane={true}>
            <HStack align={"stretch"} justifyContent={"center"} py="8">
                <Dropzone
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
                                    router.push("./app");
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
                        <VStack
                            border={"2px"}
                            borderStyle="dashed"
                            borderColor="gray"
                            p="8"
                        >
                            <Box {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Text mx="10">
                                    Drop some files here, or click to select
                                    files
                                </Text>
                            </Box>
                        </VStack>
                    )}
                </Dropzone>
            </HStack>
        </Dashboard>
    );
};

export default Home;
