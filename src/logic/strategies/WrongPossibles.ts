import { exists } from "../../util";
import { blockedBy, Hint } from "../Sudoku";
import Strategy from "./Strategy";

export default class WrongPossibles extends Strategy {

   getName() {
      return 'Incorrect Possibles'
   }

   getHints() {

      return this.find(c => c.possibles.length > 0).map(({ cell, row, col }) =>
         cell.possibles.map(value => {

            const blockers = blockedBy({ row, col }, value, this.sudoku);
            if (blockers.length === 0) return null
            else {

               const hint: Hint = {
                  row, col, value,
                  type: 'exclude',
                  ...this.blockingHighlights(blockers),
               }

               return hint

            }

         })
      ).flat().filter(exists)

   }

}
