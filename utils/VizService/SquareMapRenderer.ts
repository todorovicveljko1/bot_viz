import { MapRenderer } from "./MapRenderer";
import { MapData } from "./types";
import { $ } from "./domHelper";
import { TurnData } from "../turnData";

const SIZE = 20;
const POLYGON_STR = `${-SIZE}, ${SIZE} ${SIZE}, ${SIZE} ${SIZE}, ${-SIZE} ${-SIZE}, ${-SIZE}`;

export class SquareMapRenderer extends MapRenderer {
    constructor(svg: SVGSVGElement, data: MapData, turns: TurnData[]) {
        super(svg, data, turns);
    }
    public render(): void {
        while (this.tilesToUpdate.length) {
            let tile = this.tilesToUpdate.shift();
            if (!tile) break;
            // Create
            if (this.firstRender) {
                this.quickMap.set(tile.pos, tile);
                let pos = this.parsePos(tile.pos);
                let polygon = $.SVG<SVGPolygonElement>(`polygon#p${tile.pos}`, {
                    points: POLYGON_STR,
                    transform: `translate(${2 * SIZE * pos[0] - SIZE},${
                        2 * SIZE * pos[1] - SIZE
                    })`,
                    fill: this.tileTypes.get(tile.tile_type) ?? "",
                });

                this.mapHolder.append(polygon);
            } else {
                let polygon = this.mapHolder.querySelector("#p" + tile.pos);
                polygon?.setAttribute(
                    "fill",
                    this.tileTypes.get(tile.tile_type) ?? ""
                );
            }
        }
        // Set for updates
        if (this.firstRender) this.firstRender = false;
    }

    public getTileCenter(pos: string): [number, number] {
        let p = this.parsePos(pos);
        return [2 * SIZE * p[0] - SIZE, 2 * SIZE * p[1] - SIZE];
    }
}
