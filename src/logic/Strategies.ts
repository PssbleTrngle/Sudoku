import HiddenSingle from "./strategies/HiddenSingle";
import Strategy from "./strategies/Strategy";
import XWing from "./strategies/XWing";
import { Sudoku } from "./Sudoku";

export interface Hint {
    row: number,
    col: number,
    value: number,
}

const strategies: (new (sudoku: Sudoku) => Strategy)[] = [XWing, HiddenSingle];

async function getHints(sudoku: Sudoku) {
    return strategies
        .map(s => new s(sudoku))
        .map(s => ({ hints: s.getHints(), strategy: s.getName() }))
        .filter(s => s.hints.length > 0)
}

const Strategies = { getHints };
export default Strategies
