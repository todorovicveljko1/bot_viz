import { HStack, useColorMode, Box, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export interface NavbarProps {}

export function Navbar(props: NavbarProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack
      align="stretch"
      alignItems="center"
      justifyContent="space-between"
      px="4"
      py="2"
      borderBottomWidth="1px"
      borderBottomColor={colorMode == "light" ? "gray.200" : "whiteAlpha.200"}
    >
      <Box fontSize="lg">DecisionViz</Box>
      <Box>
        <IconButton
          aria-label="toggle-color-mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        ></IconButton>
      </Box>
    </HStack>
  );
}
