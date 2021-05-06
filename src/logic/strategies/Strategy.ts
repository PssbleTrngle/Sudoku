import { Blocker, Cell, Hint, ninthAt, Sudoku } from "../Sudoku";

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

    blockingHighlights(blockers: Blocker[]): Partial<Hint> {
        return {
            highlights: blockers.map(c => ({ col: c.point.y, row: c.point.x })),
            highlightRows: blockers.filter(c => c.source.includes('col')).map(c => c.point.x),
            highlightCols: blockers.filter(c => c.source.includes('row')).map(c => c.point.y),
            highlightNinths: blockers.filter(c => c.source.includes('ninth')).map(c => ninthAt(c.point.x, c.point.y)),
        }
    }

    abstract getHints(): Hint[]

}