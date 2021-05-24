import { exists } from "../../util";
import { blockedBy, Hint } from "../Sudoku";
import Strategy from "./Strategy";

export default class WrongCandidates extends Strategy {

   getName() {
      return 'Falscher Kandidat'
   }

   getHints() {

      return this.find(c => c.candidates.length > 0).map(({ point, ...cell }) =>
         cell.candidates.map(value => {

            const blockers = blockedBy(point, value, this.sudoku);
            if (blockers.length === 0) return null
            else {

               const hint: Hint = {
                  actions: [{
                     ...point,
                     value,
                     type: 'exclude',
                  }],
                  ...this.blockingHighlights(blockers),
               }

               return hint

            }

         })
      ).flat().filter(exists)

   }

}
