import HiddenSingle from "./strategies/HiddenSingle";
import NakedPair from "./strategies/NakedPair";
import NakedSingle from "./strategies/NakedSingle";
import NakedTriple from "./strategies/NakedTriple";
import Strategy from "./strategies/Strategy";
import WrongCandidates from "./strategies/WrongCandidates";
import XWing from "./strategies/XWing";
import { Sudoku } from "./Sudoku";

export interface Hint {
    row: number,
    col: number,
    value: number,
}

const strategies: (new (sudoku: Sudoku) => Strategy)[] = [WrongCandidates, XWing, HiddenSingle, NakedSingle, NakedPair, NakedTriple];

async function getHints(sudoku: Sudoku) {
    return strategies
        .map(s => new s(sudoku))
        .map(s => ({ hints: s.getHints(), strategy: s.getName() }))
        .filter(s => s.hints.length > 0)
}

const Strategies = { getHints };
export default Strategies
