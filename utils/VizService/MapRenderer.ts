import { MapData, TileData } from "./types";
import { $ } from "./domHelper";
import { TurnData } from "../turnData";
export class MapRenderer {
    public svg: SVGSVGElement;
    public data: MapData;
    public turns: TurnData[];
    public tileTypes: Map<string, string>;
    public annotations: string[];
    public turn: number;
    public quickMap: Map<string, TileData>;
    public tilesToUpdate: TileData[];
    public firstRender: boolean = true;
    public mapHolder: SVGElement;
    constructor(svg: SVGSVGElement, data: MapData, turns: TurnData[]) {
        this.svg = svg;
        this.data = data;
        this.turns = turns;
        this.tileTypes = new Map<string, string>();
        this.quickMap = new Map<string, TileData>();
        this.annotations = [];
        this.turn = -1;
        this.tilesToUpdate = [...data.map];
        this.mapHolder = $.SVG("g#map_holder");
        svg.append(this.mapHolder);
        Object.keys(this.data.metadata.tile_type).map((v) => {
            this.tileTypes.set(v, this.data.metadata.tile_type[v]);
        });
        // Initial render TODO: add to render later
        this.render();
    }
    public nextTurn() {
        this.turn += 1;
        if (this.turns[this.turn].data?.map) {
            this.turns[this.turn].data.map.map((v) => {
                this.tilesToUpdate.push(v);
                this.quickMap.set(v.pos, v);
            });
            this.render();
        }
    }
    public prevTurn() {
        this.setTurn(this.turn - 1);
    }
    public setTurn(turn: number) {
        if (this.turn == turn) return;
        let prev = this.turn;
        let start = 0;
        this.turn = turn;
        if (prev > this.turn) {
            this.quickMap.clear();
            this.data.map.map((v) => {
                this.quickMap.set(v.pos, v);
            });
            for (let i = this.turn; i <= prev; i++) {
                if (this.turns[i].data?.map) {
                    this.turns[i].data.map.map((v) => {
                        let p = this.quickMap.get(v.pos);
                        if (p) this.tilesToUpdate.push(p);
                    });
                }
            }
        } else {
            start = prev < 0 ? 0 : prev;
        }
        for (let i = start; i <= this.turn; i++) {
            if (this.turns[i].data?.map) {
                this.turns[i].data.map.map((v) => {
                    this.tilesToUpdate.push(v);
                    this.quickMap.set(v.pos, v);
                });
            }
        }
        this.render();
    }

    public render(): void {
        return;
    }

    //Heleper methods
    public parsePos(pos: string): [number, number] {
        let p = pos.split("_");
        return [Number.parseInt(p[0]), Number.parseInt(p[1])];
    }
    public getTileCenter(pos: string): [number, number] {
        return [0, 0];
    }
    public dispose(): void {
        this.svg.innerHTML = "";
    }
}
