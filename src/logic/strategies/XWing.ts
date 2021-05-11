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
            return cells.map(origin => {

                const inRow = cells.filter(c => c.row === origin.row && c.col !== origin.col)
                const inCol = cells.filter(c => c.row !== origin.row && c.col === origin.col)

                const acrosses = inRow.map(row => inCol.map(col => {
                    return cells.find(c => c.row === col.row && c.col === row.col)
                })).flat().filter(exists);

                const removeables = acrosses.map(a => cells.filter(c =>
                    ((c.row === origin.row || c.row === a.row) && (c.col !== origin.col && c.col !== a.col)) ||
                    ((c.col === origin.col || c.col === a.col) && (c.row !== origin.row && c.row !== a.row))
                ).map(c => ({
                    ...c, highlights: [
                        origin, a, 
                        { col: origin.col, row: a.row },
                        { col: a.col, row: origin.row },
                    ]
                }))).flat()

                return removeables;

            }).flat().map(c => ({ ...c, value: p }))

        }).flat()

        return removeables.map<Hint>(c => ({ ...c, type: 'exclude' }));

    }

}