import { arrayEqual, exists } from "../../util";
import { CellWithPoint, Hint, ninthAt, possibleBlockers } from "../Sudoku";
import Strategy from "./Strategy";

export default class XWing extends Strategy {

    getName() {
        return 'X-Wing'
    }

    getHints() {

        return this.cells().map(origin => {

            // For all candidates in this cell
            return origin.candidates.map(canditate => {

                // All other cells with that include this candidate
                const withCandidate = this.find(({ candidates }) => candidates.includes(canditate))

                // Search for cells in the same column with this candidate
                return withCandidate.filter(({ point }) => origin.point.col === point.col && origin.point.row < point.row).map(inCol => {

                    // Search for cells in the same row with this candidate
                    return withCandidate.filter(({ point }) => origin.point.row === point.row && origin.point.col < point.col).map(inRow => {

                        // The point & cell which would complete a rectangle made up of the point in the column, in the row and the origin point
                        // and check if this `across` cell also contains the candidate
                        const acrossPoint = { row: inCol.point.row, col: inRow.point.col }
                        const across: CellWithPoint = { point: acrossPoint, ...this.sudoku.cells[acrossPoint.row][acrossPoint.col] }
                        if (!across.candidates.includes(canditate)) return null

                        // The corners of the rectangle
                        const corners = [origin, inCol, inRow, across]

                        // Check if all corners are in different ninths
                        const ninths = corners.map(c => ninthAt(c.point)).filter((n1, i1, a) => !a.some((n2, i2) => i2 < i1 && n1 === n2))
                        if (ninths.length !== 4) return null

                        // Search for cells which are in the same row or column as one of the corners
                        // but are not one of the corners
                        const blockers = corners.map(c => possibleBlockers(this.sudoku, c.point)).flat()
                            .filter(b => !corners.some(c => c.point.row === b.point.row && c.point.col === b.point.col))
                            .filter(b => !arrayEqual(b.source, ['ninth']))

                        // Propose to remove the candidate the corners share from these blockers
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