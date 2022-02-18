import { MapData, TileData } from "./types";
import { $ } from "./domHelper";
import { TurnData } from "../turnData";
export class MapRenderer {
    public svg: SVGSVGElement;
    public data: MapData;
    public turns: TurnData[];
    public tileTypes: Map<string, string>;
    public turn: number;
    public quickMap: Map<string, TileData>;
    public tilesToUpdate: TileData[];
    public firstRender: boolean = true;
    public mapHolder: SVGElement;
    public anotHolder: SVGElement;
    public playerHolder: SVGElement;
    constructor(svg: SVGSVGElement, data: MapData, turns: TurnData[]) {
        this.svg = svg;
        this.data = data;
        this.turns = turns;
        this.tileTypes = new Map<string, string>();
        this.quickMap = new Map<string, TileData>();
        this.turn = -1;
        this.tilesToUpdate = [...data.map];
        this.mapHolder = $.SVG("g#map_holder");
        this.anotHolder = $.SVG("g#anot_holder");
        this.playerHolder = $.SVG("g#player_holder");
        svg.append(this.mapHolder);
        svg.append(this.playerHolder);
        svg.append(this.anotHolder);
        Object.keys(this.data.metadata.tile_type).map((v) => {
            this.tileTypes.set(v, this.data.metadata.tile_type[v]);
        });
        // Initial render TODO: add to render later
        this.render();
        this.render_short_term();
    }

    //Change turns
    public nextTurn() {
        this.setTurn(this.turn + 1);
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
        this.render_short_term();
    }

    public render_short_term() {
        this.anotHolder.innerHTML = "";
        this.playerHolder.innerHTML = "";
        this._render_annotations();

        if (this.data.players.me && this.data.players.opponents)
            this._render_players();
    }
    public render(): void {
        return;
    }

    public _render_annotations() {}
    public _render_players() {
        let data: MapData;
        if (this.turn < 0) {
            data = this.data;
        } else {
            data = this.turns[this.turn].data;
        }
        let center = this.getTileCenter(data.players.me.pos);
        let me = $.SVG(
            "text#player_me",
            {
                transform: `translate(${center[0]},${center[1] + 2})`,
                stroke: `darkgreen`,
                fill: `darkgreen`,
                "text-anchor": "middle",
                "font-size": "24px",
                "line-height": "24px",
                "dominant-baseline": "middle",
            },
            "@"
        );
        this.playerHolder.append(me);
        for (let op of data.players.opponents) {
            let center = this.getTileCenter(op.pos);
            this.playerHolder.append(
                $.SVG(
                    "text#player_op_" + op.id,
                    {
                        transform: `translate(${center[0]},${center[1] + 2})`,
                        stroke: `darkred`,
                        fill: "darkred",
                        "text-anchor": "middle",
                        "font-size": "24px",
                        "dominant-baseline": "middle",
                    },
                    "@"
                )
            );
        }
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
