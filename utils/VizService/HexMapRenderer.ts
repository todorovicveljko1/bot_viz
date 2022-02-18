import { MapRenderer } from "./MapRenderer";
import { MapData } from "./types";

export class HexMapRenderer extends MapRenderer {
    constructor(svg: SVGSVGElement, data: MapData) {
        super(svg, data);
    }
}
