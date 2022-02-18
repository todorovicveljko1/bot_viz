import { HexMapRenderer } from "./HexMapRenderer";
import { MapRenderer } from "./MapRenderer";
import { SquareMapRenderer } from "./SquareMapRenderer";
import { MapData } from "./types";
import { TurnData } from "../turnData";

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
            console.log(data);
            switch (data.metadata.type) {
                case "HEX":
                    this.renderer?.dispose();
                    this.renderer = new HexMapRenderer(this.root, data);

                    break;
                case "SQUARE":
                    this.renderer?.dispose();
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
}
