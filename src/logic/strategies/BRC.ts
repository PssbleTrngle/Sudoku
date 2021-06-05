import { arrayOf, exists } from "../../util";
import { Hint, inRow, ninthAt } from "../Sudoku";
import Strategy from "./Strategy";

export default class BRC extends Strategy {

   getName() {
      return 'Block-Reihe-Check'
   }

   getHints() {

      const candidates = arrayOf(9)
      const empty = this.find(c => !c.value)

      return arrayOf(9).map(ninth => {

         const inNinth = empty.filter(c => ninthAt(c.point) === ninth)

         return candidates.map(candidate => {

            const withCandidate = inNinth.filter(c => c.candidates.includes(candidate))
            if (withCandidate.length === 0) return null

            const [row, ...rows] = withCandidate.map(c => c.point.row).filter((n1, i1, a) => !a.some((n2, i2) => i2 < i1 && n1 === n2))
            if (rows.length > 0) return null;

            const remove = inRow(row, this.sudoku)
               .filter(c => c.candidates.includes(candidate))
               .filter(c => ninthAt(c.point) !== ninth)

            const hint: Hint = {
               actions: remove.map(c => ({
                  type: 'exclude',
                  value: candidate,
                  ...c.point,
               })),
               highlights: withCandidate.map(c => ({ ...c.point, candidates: [candidate] })),
               highlightNinths: [ninth],
               highlightRows: [row],
            }

            return hint

         })

      }).flat().filter(exists)

   }

}
