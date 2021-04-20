import { arrayOf, exists } from "../../util";
import { blockedBy, canPut, Hint, ninthAt } from "../Sudoku";
import Strategy, { CellPoint } from "./Strategy";

export default class HiddenSingle extends Strategy {

   getName() {
      return 'Versteckter Single'
   }

   forCells(cells: CellPoint[]) {
      const empty = cells.filter(c => !c.cell.value)

      const filled = cells
         .map(c => c.cell.value)
         .filter(exists)

      const missing = arrayOf(9).filter(i => !filled.includes(i))

      return missing.map(value => {

         const possibilities = empty.filter(cell => canPut(cell.row, cell.col, value, this.sudoku))

         if (possibilities.length === 1) {
            const [cell] = possibilities

            const blockers = empty.map(cell => blockedBy(cell.row, cell.col, value, this.sudoku)).flat()

            const hint: Hint = {
               ...cell,
               value,
               type: 'value',
               highlights: blockers.map(c => ({ col: c.point.y, row: c.point.x })),
               blocked: empty.filter(e => e.col !== cell.col || e.row !== cell.row),
               highlightCols: blockers.filter(c => c.source === 'col').map(c => c.point.x),
               highlightRows: blockers.filter(c => c.source === 'row').map(c => c.point.y),
               highlightNinths: blockers.filter(c => c.source === 'ninth').map(c => ninthAt(c.point.x, c.point.y)),
            }

            return hint
         }

         else return null

      })
   }

   getHints() {

      return arrayOf(9).map(i => i - 1).map(i => {

         const inNinth = this.find((_, c, r) => ninthAt(c, r) === i)
         const inCol = this.find((_, c, _r) => c === i)
         const inRow = this.find((_, _c, r) => r === i)

         return [inNinth, inCol, inRow].map((c, i) => this.forCells(c).map(h => h && ({ ...h, i }))).flat()

      }).flat().filter(exists)

   }

}
