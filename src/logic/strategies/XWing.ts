import { exists } from "../../util";
import { Hint } from "../Sudoku";
import Strategy from "./Strategy";

export default class XWing extends Strategy {

    getName() {
        return 'X-Wing'
    }

    getHints() {

        const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9]
            .filter(i => this.find(c => c.candidates.includes(i)))

        const removeables = candidates.map(p => {

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

        return removeables.map<Hint>(c => ({ ...c, type: 'exclude' }));

    }

}