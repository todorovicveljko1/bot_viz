import { TurnData } from "../turnData";
import { MapRenderer } from "./MapRenderer";
import { MapData } from "./types";
import { $ } from "./domHelper";

const SIZE = 20;
const POLYGON_STR = `
    ${SIZE * Math.cos(Math.PI / 3)} ${SIZE * Math.sin(Math.PI / 3)}
    ${SIZE * Math.cos((2 * Math.PI) / 3)} ${SIZE * Math.sin((2 * Math.PI) / 3)}
    ${SIZE * Math.cos(Math.PI)} ${SIZE * Math.sin(Math.PI)}
    ${SIZE * Math.cos((4 * Math.PI) / 3)} ${SIZE * Math.sin((4 * Math.PI) / 3)}
    ${SIZE * Math.cos((5 * Math.PI) / 3)} ${SIZE * Math.sin((5 * Math.PI) / 3)}
    ${SIZE * Math.cos(0)} ${SIZE * Math.sin(0)}`;

export class HexMapRenderer extends MapRenderer {
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
                    transform: `translate(${pos[0] * 1.5 * SIZE},${
                        (pos[0] * 0.86602540378 + pos[1] * 1.73205080757) * SIZE
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
        return [
            p[0] * 1.5 * SIZE,
            (p[0] * 0.86602540378 + p[1] * 1.73205080757) * SIZE,
        ];
    }
}

/*
`translate(${hex.q * 1.5 * 100},${Math.round(
        (hex.q * 0.86602540378 + hex.r * 1.73205080757) * 100
      )})`

*/
