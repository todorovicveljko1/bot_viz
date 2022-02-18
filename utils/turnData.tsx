import { createContext, useContext, useState } from "react";
import { VizService } from "./VizService";
import { MapData } from "./VizService/types";

export type TurnData = {
    debug: { [key: number]: any };
    data: MapData;
};

interface DebugDataProviderProps {
    children: any;
    root?: any;
    turns?: TurnData[] | any;
    data?: MapData;
}

type contextData = {
    turn: number;
    turns: TurnData[];
    active: TurnData;
    data: MapData;
    nextTurn: () => void;
    prevTurn: () => void;
    setTurn: (turn: number) => void;
    newFile: (data: any) => void;
    root: any;
};

const TurnDataContext = createContext<any>(null);
export const TurnDataProvider = (props: DebugDataProviderProps) => {
    const [turn, _setTurn] = useState(-1);
    const [turns, setTurns] = useState(props.turns);
    const [active, setActiveTurn] = useState<TurnData | null>(null);
    const [root, setRoot] = useState(props.root);
    const [data, setData] = useState(props.data);
    const nextTurn = () => {
        if (turns && turns.length > turn + 1) {
            let t = turn + 1;
            _setTurn(t);
            setActiveTurn(turns[t]);
            VizService.getInstance().renderer?.nextTurn();
        }
    };
    const prevTurn = () => {
        if (turns && turn > 0) {
            let t = turn - 1;
            _setTurn(t);
            setActiveTurn(turns[t]);
            VizService.getInstance().renderer?.prevTurn();
        }
    };
    const setTurn = (_turn: number) => {
        if (turns && _turn >= 0 && _turn < turns.length) {
            _setTurn(_turn);
            setActiveTurn(turns[_turn]);
            VizService.getInstance().renderer?.setTurn(_turn);
        }
    };
    const newFile = (_data: any) => {
        _setTurn(-1);
        setTurns(_data.turns);
        setRoot(_data.root);
        setData(_data.data);
        setActiveTurn(null);
    };

    return (
        <TurnDataContext.Provider
            value={{
                turn,
                turns,
                active,
                nextTurn,
                prevTurn,
                setTurn,
                root,
                newFile,
                data,
            }}
        >
            {props.children}
        </TurnDataContext.Provider>
    );
};

export const useTurnData = () => useContext(TurnDataContext) as contextData;
