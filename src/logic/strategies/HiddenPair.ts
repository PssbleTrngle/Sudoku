import { arrayEqual, arrayOf, exists } from "../../util";
import { Hint } from "../Sudoku";
import Strategy from "./Strategy";

export default class HiddenPair extends Strategy {

   private static pairs = arrayOf(9).map(a => arrayOf(9).filter(b => a < b).map(b => [a, b])).flat()

   getName() {
      return 'Verstecktes Paar'
   }

   getHints() {
      return this.forGroups(cells => {

         return HiddenPair.pairs.map<Hint | null>(candidates => {

            const matching = cells.filter(c => arrayEqual(candidates, c.candidates))
            if (matching.length !== 2) return null

            return {
               actions: matching.map(({ point }, i) => ({
                  value: candidates[i],
                  ...point,
                  type: 'value',
               })),
               highlights: matching.map(m => ({ ...m.point, candidates })),
            }

         }).filter(exists)

      })
   }

}
