import { exists } from "../../util";
import { blockedBy, canPut, Hint, symbols } from "../Sudoku";
import Strategy from "./Strategy";

export default class HiddenSingle extends Strategy {

   getName() {
      return 'Versteckter Single'
   }

   getHints() {
      return this.forGroups(cells => {
         const empty = cells.filter(c => !c.value)

         const filled = cells
            .map(c => c.value)
            .filter(exists)

         const missing = symbols.filter(i => !filled.includes(i))

         return missing.map(value => {

            const possibilities = empty.filter(cell => canPut(cell.point, value, this.sudoku))

            if (possibilities.length === 1) {
               const [cell] = possibilities

               const blockers = empty.map(cell => blockedBy(cell.point, value, this.sudoku)).flat()

               const hint: Hint = {
                  actions: [{
                     ...cell,
                     ...cell.point,
                     value,
                     type: 'value',
                  }],
                  blocked: empty.map(e => e.point).filter(e => e.col !== cell.point.col || e.row !== cell.point.row),
                  ...this.blockingHighlights(blockers),
               }

               return hint
            }

            else return null

         }).filter(exists)
      })
   }

}
