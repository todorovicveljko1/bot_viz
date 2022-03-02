import { HexMapRenderer } from "./HexMapRenderer";
import { MapRenderer } from "./MapRenderer";
import { SquareMapRenderer } from "./SquareMapRenderer";
import { MapData } from "./types";
import { TurnData } from "../turnData";
import { $ } from "./domHelper";

/**
 * Singleton
 */
export class VizService {
    public static instance: VizService;

    public zoom: number = 800;
    public root?: SVGSVGElement;
    public renderer?: MapRenderer;

    linkToSVG(svg: SVGSVGElement) {
        this.root = svg;
    }

    public static getInstance(): VizService {
        if (!VizService.instance) {
            VizService.instance = new VizService();
        }

        return VizService.instance;
    }

    public loadInitData(data: MapData, turns: TurnData[]) {
        if (this.root && data?.metadata) {
            switch (data.metadata.type) {
                case "HEX":
                    this.renderer?.dispose();
                    this._presetDefs();
                    this.renderer = new HexMapRenderer(this.root, data, turns);

                    break;
                case "SQUARE":
                    this.renderer?.dispose();
                    this._presetDefs();
                    this.renderer = new SquareMapRenderer(
                        this.root,
                        data,
                        turns
                    );
                    break;
                default:
                    break;
            }
        }
    }
    public _presetDefs() {
        let defs = $.SVG("defs");
        defs.innerHTML = `<marker stroke="white" fill="none" id="ARROW_HEAD" markerWidth="16" markerHeight="16" 
        refX="10" refY="4" markerUnits="userSpaceOnUse" orient="auto" stroke-width="2">
            <polyline points="0 0, 10 4, 0 8" />
        </marker>`;
        this.root?.append(defs);
    }
}
