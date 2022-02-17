import { useEffect, useRef, useState } from "react";
import { SVGRegisterEvents } from "../../utils/SVGRegisterEvents";
import { VizService } from "../../utils/VizService";
import data from "../../public/example.json";
import { useColorMode, useToken } from "@chakra-ui/react";

export type SVGBaseProps = {
    children?: JSX.Element | JSX.Element | string | string[];
    zoomLevel?: number;
};

export function SVGBase(props: SVGBaseProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const [zoomLevel, setZoomLevel] = useState(props.zoomLevel ?? 800);
    const [positionOffset, setPositionOffset] = useState([0, 0]);
    const { colorMode } = useColorMode();
    const [fillDark, strokeDark, fillLight, strokeLight] = useToken("colors", [
        "whiteAlpha.100",
        "whiteAlpha.300",
        "gray.100",
        "gray.300",
    ]);
    useEffect(
        function () {
            if (svgRef.current) {
                SVGRegisterEvents(svgRef.current, {
                    setPositionOffset,
                    zoomLevel,
                });
                VizService.getInstance().linkToSVG(svgRef.current);
                //VizService.getInstance().loadJSON(data);
            }
        },
        [zoomLevel]
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
                    : -zoomLevel / 2 - positionOffset[0]
            }
            ${
                svgRef.current
                    ? svgRef.current.viewBox.baseVal.y
                    : -zoomLevel / 2 - positionOffset[1]
            }
            ${zoomLevel}
            ${zoomLevel}
          `}
            fill={colorMode == "light" ? fillLight : fillDark}
            stroke={colorMode == "light" ? strokeLight : strokeDark}
            strokeWidth="1"
        >
            {props.children}
        </svg>
    );
}
