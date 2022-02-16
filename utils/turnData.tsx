import { createContext, useContext, useState } from "react";

type TurnData = {
    debug: { [key: number]: any };
    data: [];
    annotations: [];
};

interface DebugDataProviderProps {
    children: any;
    turns?: TurnData[] | any;
}

type contextData = {
    turn: number;
    data: TurnData[];
    active: TurnData;
    nextTurn: () => void;
    prevTurn: () => void;
    setTurn: (turn: number) => void;
};

const TurnDataContext = createContext<any>(null);
export const TurnDataProvider = (props: DebugDataProviderProps) => {
    const [turn, _setTurn] = useState(-1);
    const [data, setTurnsData] = useState(props.turns);
    const [active, setActiveTurn] = useState<TurnData | null>(null);

    const nextTurn = () => {
        console.log(data.length, turn);
        if (data && data.length > turn + 1) {
            let t = turn + 1;
            _setTurn(t);
            setActiveTurn(data[t]);
        }
    };
    const prevTurn = () => {
        if (data && turn > 0) {
            let t = turn - 1;
            _setTurn(t);
            setActiveTurn(data[t]);
        }
    };
    const setTurn = (_turn: number) => {
        if (data && _turn >= 0 && _turn < data.length) {
            _setTurn(_turn);
            setActiveTurn(data[_turn]);
        }
    };

    return (
        <TurnDataContext.Provider
            value={{ turn, data, active, nextTurn, prevTurn, setTurn }}
        >
            {props.children}
        </TurnDataContext.Provider>
    );
};

export const useTurnData = () => useContext(TurnDataContext) as contextData;
