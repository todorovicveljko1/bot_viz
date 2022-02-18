export type MapData = {
    metadata: MapMetaData;
    map: TileData[];
    players: {
        me: PlayerData;
        opponents: PlayerData[];
    };
};
export type MapMetaData = {
    type: "HEX" | "SQUARE" | string;
    tile_type: { [key: string]: string };
    subtype: string;
    offset: [number, number];
};
export type TileData = {
    pos: string;
    tile_type: string;
    [key: string]: string;
};

export type PlayerData = {
    id: string;
    pos: string;
    [key: string]: string;
};
