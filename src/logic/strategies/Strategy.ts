import fs from "fs";
import path from "path";
import { Sudoku, Cell, Hint } from "../Sudoku";

export default abstract class Strategy {

    constructor(protected sudoku: Sudoku) {}

    abstract getName(): string;

    private cells() {
        return this.sudoku.cells.map((r, row) => r.map((cell, col) => ({ col, row, cell })))
            .reduce((a, b) => [...a, ...b], [])
    }
    
    find(matcher: (cell: Cell) => boolean) {
        return this.cells().filter(c => matcher(c.cell))
    }

    abstract getHints(): Hint[]

}