import { Sudoku } from "../Sudoku";
import BRC from "./BRC";
import HiddenPair from "./HiddenPair";
import HiddenSingle from "./HiddenSingle";
import LonelyCandidates from "./LonelyCandidates";
import NakedPair from "./NakedPair";
import NakedSingle from "./NakedSingle";
import NakedTriple from "./NakedTriple";
import RBC from "./RBC";
import ForbiddenRectangle1 from "./rectangles/Type1";
import ForbiddenRectangle2 from "./rectangles/Type2";
import ForbiddenRectangle4 from "./rectangles/Type4";
import Strategy from "./Strategy";
import ThirdEye from "./ThirdEye";
import WrongCandidates from "./WrongCandidates";
import WWing from "./WWing";
import XChain from "./XChain";
import XWing from "./XWing";
import XYWing from "./XYWing";

export interface Hint {
    row: number,
    col: number,
    value: number,
}

const strategies: (new (sudoku: Sudoku) => Strategy)[] = [
    WrongCandidates, LonelyCandidates,
    HiddenSingle, NakedSingle,
    NakedPair, NakedTriple, HiddenPair,
    RBC, BRC,
    ForbiddenRectangle1, ForbiddenRectangle2, ForbiddenRectangle4,
    ThirdEye,
    XWing, XYWing, WWing,
    XChain,
];

async function getHints(sudoku: Sudoku) {
    return strategies
        .map(s => new s(sudoku))
        .map(s => ({ hints: s.getHints().filter(h => h.actions.length > 0), strategy: s.getName() }))
        .filter(s => s.hints.length > 0)
}

const Strategies = { getHints };
export default Strategies
