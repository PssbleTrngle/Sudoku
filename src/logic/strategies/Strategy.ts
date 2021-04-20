import { Cell, Hint, Sudoku } from "../Sudoku";

export type CellPoint = { cell: Cell, row: number, col: number }

export default abstract class Strategy {

    constructor(protected sudoku: Sudoku) { }

    abstract getName(): string;

    private cells(): CellPoint[] {
        return this.sudoku.cells.map((r, row) => r.map((cell, col) => ({ col, row, cell })))
            .reduce((a, b) => [...a, ...b], [])
    }

    find(matcher: (cell: Cell, col: number, row: number) => boolean) {
        return this.cells().filter(c => matcher(c.cell, c.col, c.row))
    }

    abstract getHints(): Hint[]

}