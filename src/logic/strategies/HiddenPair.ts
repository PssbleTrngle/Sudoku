import { exists } from "../../util";
import { Action, Hint } from "../Sudoku";
import Strategy from "./Strategy";

export default class HiddenPair extends Strategy {

   getName() {
      return 'Verstecktes Paar'
   }

   getHints() {
      return this.forGroups((cells, type) => {

         return HiddenPair.pairs.map<Hint | null>(candidates => {

            const any = cells.filter(cell => candidates.some(c => cell.candidates.includes(c)))
            const matching = cells.filter(cell => candidates.every(c => cell.candidates.includes(c)))
            if (matching.length !== 2 || any.length !== 2) return null

            const otherCandidates = matching.map(c => c.candidates).flat().filter(c => !candidates.includes(c))

            return {
               ...this.highlightGroup(type, matching[0].point),
               actions: matching.map(({ point }) => otherCandidates.map(value => ({
                  value,
                  ...point,
                  type: 'exclude',
               }))).flat() as Action[],
               highlights: matching.map(m => ({ ...m.point, candidates })),
            }

         }).filter(exists)

      })
   }

}
