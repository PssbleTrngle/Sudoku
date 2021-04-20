import HiddenSingle from "./strategies/HiddenSingle";
import NakedSingle from "./strategies/NakedSingle";
import Strategy from "./strategies/Strategy";
import WrongPossibles from "./strategies/WrongPossibles";
import XWing from "./strategies/XWing";
import { Sudoku } from "./Sudoku";

export interface Hint {
    row: number,
    col: number,
    value: number,
}

const strategies: (new (sudoku: Sudoku) => Strategy)[] = [WrongPossibles, XWing, HiddenSingle, NakedSingle];

async function getHints(sudoku: Sudoku) {
    return strategies
        .map(s => new s(sudoku))
        .map(s => ({ hints: s.getHints(), strategy: s.getName() }))
        .filter(s => s.hints.length > 0)
}

const Strategies = { getHints };
export default Strategies
