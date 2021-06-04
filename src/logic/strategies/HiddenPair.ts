import { arrayOf, exists } from "../../util";
import { Action, Hint } from "../Sudoku";
import Strategy from "./Strategy";

export default class HiddenPair extends Strategy {

   private static pairs = arrayOf(9).map(a => arrayOf(9).filter(b => a < b).map(b => [a, b])).flat()

   getName() {
      return 'Verstecktes Paar'
   }

   getHints() {
      return this.forGroups(cells => {

         return HiddenPair.pairs.map<Hint | null>(candidates => {

            const any = cells.filter(cell => candidates.some(c => cell.candidates.includes(c)))
            const matching = cells.filter(cell => candidates.every(c => cell.candidates.includes(c)))
            if (matching.length !== 2 || any.length !== 2) return null

            const otherCandidates = matching.map(c => c.candidates).flat().filter(c => !candidates.includes(c))

            return {
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
