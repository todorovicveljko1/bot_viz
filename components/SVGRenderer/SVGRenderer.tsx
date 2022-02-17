import { VStack, Box } from "@chakra-ui/react";

export interface SVGRendererProps {
    children?: JSX.Element | JSX.Element | string | string[];
}

export function SVGRenderer(props: SVGRendererProps) {
    return <VStack align="stretch"></VStack>;
}
