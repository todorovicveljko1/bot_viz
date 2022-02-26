import { useEffect, useRef, useState } from "react";
import { SVGRegisterEvents } from "../../utils/SVGRegisterEvents";
import { VizService } from "../../utils/VizService";
import { useColorMode, useToken } from "@chakra-ui/react";
import { useTurnData } from "../../utils/turnData";

export type SVGBaseProps = {
    children?: JSX.Element | JSX.Element | string | string[];
    zoomLevel?: number;
};

export function SVGBase(props: SVGBaseProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const zoomLevel = VizService.getInstance().zoom;
    const { colorMode } = useColorMode();
    const { data, turns } = useTurnData();
    const [fillDark, strokeDark, fillLight, strokeLight] = useToken("colors", [
        "gray.700",
        "gray.800",
        "gray.300",
        "white",
    ]);
    useEffect(
        function () {
            if (svgRef.current) {
                VizService.getInstance().linkToSVG(svgRef.current);
                VizService.getInstance().loadInitData(data, turns);
                return SVGRegisterEvents(svgRef.current, {});
            }
        },
        [data, turns]
    );

    return (
        <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%" }}
            viewBox={`
            ${
                svgRef.current
                    ? svgRef.current.viewBox.baseVal.x
                    : -zoomLevel / 2
            }
            ${
                svgRef.current
                    ? svgRef.current.viewBox.baseVal.y
                    : -zoomLevel / 2
            }
            ${svgRef.current ? svgRef.current.viewBox.baseVal.width : zoomLevel}
            ${svgRef.current ? svgRef.current.viewBox.baseVal.width : zoomLevel}
          `}
            fill={colorMode == "light" ? fillLight : fillDark}
            stroke={colorMode == "light" ? strokeLight : strokeDark}
            strokeWidth="1"
        >
            {props.children}
        </svg>
    );
}
