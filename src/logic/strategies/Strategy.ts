import { arrayOf } from "../../util";
import { Blocker, CellWithPoint, Hint, ninthAt, Sudoku } from "../Sudoku";

export default abstract class Strategy {

    constructor(protected sudoku: Sudoku) { }

    abstract getName(): string;

    protected cells(): CellWithPoint[] {
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

    forGroups(func: (cells: CellWithPoint[]) => Hint[]) {
        return arrayOf(9).map(i => i - 1).map(i => {

            const inNinth = this.find(({ point }) => ninthAt(point) === i)
            const inCol = this.find(({ point }) => point.col === i)
            const inRow = this.find(({ point }) => point.row === i)

            return [inNinth, inCol, inRow].map(c => func(c)).flat()

        }).flat()
    }

    abstract getHints(): Hint[]

}