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

            const possibilities = empty.filter(cell => canPut(cell, value, this.sudoku))

            if (possibilities.length === 1) {
               const [cell] = possibilities

               const blockers = empty.map(cell => blockedBy(cell, value, this.sudoku)).flat()

               const hint: Hint = {
                  actions: [{
                     ...cell,
                     value,
                     type: 'value',
                  }],
                  blocked: empty.filter(it => it.col !== cell.col || it.row !== cell.row),
                  ...this.blockingHighlights(blockers),
               }

               return hint
            }

            else return null

         }).filter(exists)
      })
   }

}
