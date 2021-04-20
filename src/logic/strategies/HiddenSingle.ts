import { arrayOf, exists } from "../../util";
import { blockedBy, canPut, Hint, ninthAt } from "../Sudoku";
import Strategy from "./Strategy";

export default class HiddenSingle extends Strategy {

   getName() {
      return 'Versteckter Single'
   }

   getHints() {

      const ninths = arrayOf(9).map(i => i - 1)

      return ninths.map(ninth => {

         const cells = this.find((_, c, r) => ninthAt(c, r) === ninth)
         const empty = cells.filter(c => !c.cell.value)

         const filled = cells
            .map(c => c.cell.value)
            .filter(exists)

         const missing = arrayOf(9).filter(i => !filled.includes(i))

         return missing.map(value => {

            const possibilities = empty.filter(cell => canPut(cell.row, cell.col, value, this.sudoku))

            if (possibilities.length === 1) {

               const blockers = empty.map(cell => blockedBy(cell.row, cell.col, value, this.sudoku)).flat()

               const hint: Hint = {
                  value,
                  type: 'value',
                  ...possibilities[0],
                  highlights: blockers.map(c => ({ col: c.point.y, row: c.point.x })),
                  highlightCols: blockers.filter(c => c.source === 'row').map(c => c.point.y),
                  highlightRows: blockers.filter(c => c.source === 'col').map(c => c.point.x),
               }

               return hint
            }

            else return null

         })

      }).flat().filter(exists)

   }

}
