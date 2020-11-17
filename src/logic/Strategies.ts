import fs from "fs";
import path from "path";
import { Sudoku } from "./Sudoku";
import Strategy from "./strategies/Strategy";
import XWing from "./strategies/XWing";

interface Hint {
    row: number,
    col: number,
    value: number,
}

const strategies: (new (sudoku: Sudoku) => Strategy)[] = [XWing];

async function getHints(sudoku: Sudoku) {
    return strategies
        .map(s => new s(sudoku))
        .map(s => ({ hints: s.getHints(), strategy: s.getName() }))
        .filter(s => s.hints.length > 0)
}

const Strategies = { getHints };
export default Strategies
