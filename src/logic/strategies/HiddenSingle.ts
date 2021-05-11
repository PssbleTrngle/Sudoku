import { arrayOf, exists } from "../../util";
import { blockedBy, canPut, CellWithPoint, Hint, ninthAt } from "../Sudoku";
import Strategy from "./Strategy";

export default class HiddenSingle extends Strategy {

   getName() {
      return 'Versteckter Single'
   }

   forCells(cells: CellWithPoint[]) {
      const empty = cells.filter(c => !c.value)

      const filled = cells
         .map(c => c.value)
         .filter(exists)

      const missing = arrayOf(9).filter(i => !filled.includes(i))

      return missing.map(value => {

         const possibilities = empty.filter(cell => canPut(cell.point, value, this.sudoku))

         if (possibilities.length === 1) {
            const [cell] = possibilities

            const blockers = empty.map(cell => blockedBy(cell.point, value, this.sudoku)).flat()

            const hint: Hint = {
               ...cell,
               ...cell.point,
               value,
               type: 'value',
               blocked: empty.map(e => e.point).filter(e => e.col !== cell.point.col || e.row !== cell.point.row),
               ...this.blockingHighlights(blockers),
            }

            return hint
         }

         else return null

      })
   }

   getHints() {

      return arrayOf(9).map(i => i - 1).map(i => {

         const inNinth = this.find(({ point }) => ninthAt(point) === i)
         const inCol = this.find(({ point }) => point.col === i)
         const inRow = this.find(({ point }) => point.row === i)

         return [inNinth, inCol, inRow].map((c, i) => this.forCells(c).map(h => h && ({ ...h, i }))).flat()

      }).flat().filter(exists)

   }

}
