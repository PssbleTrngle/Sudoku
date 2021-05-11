import { Blocker, CellWithPoint, Hint, ninthAt, Sudoku } from "../Sudoku";

export default abstract class Strategy {

    constructor(protected sudoku: Sudoku) { }

    abstract getName(): string;

    private cells(): CellWithPoint[] {
        return this.sudoku.cells.map((r, row) => r.map((cell, col) => ({ ...cell, point: { col, row } })))
            .reduce((a, b) => [...a, ...b], [])
    }

    find(matcher: (cell: CellWithPoint) => boolean) {
        return this.cells().filter(c => matcher(c))
    }

    blockingHighlights(blockers: Blocker[]): Partial<Hint> {
        return {
            highlights: blockers.map(c => c.point),
            highlightCols: blockers.filter(c => c.source.includes('col')).map(c => c.point.col),
            highlightRows: blockers.filter(c => c.source.includes('row')).map(c => c.point.row),
            highlightNinths: blockers.filter(c => c.source.includes('ninth')).map(c => ninthAt(c.point)),
        }
    }

    abstract getHints(): Hint[]

}