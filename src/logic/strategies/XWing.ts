import { arrayEqual, exists } from "../../util";
import { CellWithPoint, Hint, ninthAt, possibleBlockers } from "../Sudoku";
import Strategy from "./Strategy";

export default class XWing extends Strategy {

    getName() {
        return 'X-Wing'
    }

    getHints() {

        /*
        const removeables = arrayOf(9).map(p => {

            const cells = this.find(c => c.candidates.includes(p))
            return cells.map(({ point: origin }) => {

                const inRow = cells.filter(c => c.point.row === origin.row && c.point.col !== origin.col)
                const inCol = cells.filter(c => c.point.row !== origin.row && c.point.col === origin.col)

                const acrosses = inRow.map(row => inCol.map(col => {
                    return cells.find(c => c.point.row === col.point.row && c.point.col === row.point.col)
                })).flat().filter(exists);

                const removeables = acrosses.map(a => cells.filter(c =>
                    ((c.point.row === origin.row || c.point.row === a.point.row) && (c.point.col !== origin.col && c.point.col !== a.point.col)) ||
                    ((c.point.col === origin.col || c.point.col === a.point.col) && (c.point.row !== origin.row && c.point.row !== a.point.row))
                ).map(c => ({
                    ...c, ...c.point, highlights: [
                        origin, a.point,
                        { col: origin.col, row: a.point.row },
                        { col: a.point.col, row: origin.row },
                    ]
                }))).flat()

                return removeables;

            }).flat().map(c => ({ ...c, value: p }))

        }).flat()

        return removeables.map<Hint>(c => ({
            actions: [{
                ...c, type: 'exclude'
            }]
        }));
        */

        return this.cells().map(origin => {

            return origin.candidates.map(canditate => {

                const withCandidate = this.find(({ candidates }) => candidates.includes(canditate))

                return withCandidate.filter(({ point }) => origin.point.col === point.col && origin.point.row < point.row).map(inCol => {

                    return withCandidate.filter(({ point }) => origin.point.row === point.row && origin.point.col < point.col).map(inRow => {

                        const acrossPoint = { row: inCol.point.row, col: inRow.point.col }
                        const across: CellWithPoint = { point: acrossPoint, ...this.sudoku.cells[acrossPoint.row][acrossPoint.col] }
                        const corners = [origin, inCol, inRow, across]

                        if (!across.candidates.includes(canditate)) return null

                        const ninths = corners.map(c => ninthAt(c.point)).filter((n1, i1, a) => !a.some((n2, i2) => i2 < i1 && n1 === n2))
                        if (ninths.length !== 4) return null

                        const blockers = corners.map(c => possibleBlockers(this.sudoku, c.point)).flat()
                            .filter(b => !corners.some(c => c.point.row === b.point.row && c.point.col === b.point.col))
                            .filter(b => !arrayEqual(b.source, ['ninth']))

                        const hint: Hint = {
                            actions: blockers.map(b => ({
                                type: 'exclude',
                                value: canditate,
                                ...b.point,
                            })),
                            highlights: corners.map(c => ({ ...c.point, candidates: [canditate] })),
                            highlightCols: corners.map(c => c.point.col),
                            highlightRows: corners.map(c => c.point.row),
                        }

                        return hint

                    })

                })

            })

        }).flat(3).filter(exists)

    }

}