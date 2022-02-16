import {
    List,
    UnorderedList,
    ListItem,
    Text,
    HStack,
    Collapse,
    VStack,
    Box,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { Dashboard } from "../components/Layout/Dashboard";
import Dropzone from "react-dropzone";
import { useTurnData } from "../utils/turnData";
import { useRouter } from "next/router";

const Home: NextPage = () => {
    const { newFile } = useTurnData();
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
                                    newFile(v);
                                    router.push("./app");
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
