import { arrayOf, exists } from "../../util";
import { Hint, inNinth, ninthAt } from "../Sudoku";
import Strategy from "./Strategy";

export default class RBC extends Strategy {

   getName() {
      return 'Reihe-Block-Check'
   }

   getHints() {

      const candidates = arrayOf(9)
      const empty = this.find(c => !c.value)

      return arrayOf(9).map(row => {

         const inRow = empty.filter(c => c.point.row === row)

         return candidates.map(candidate => {

            const withCandidate = inRow.filter(c => c.candidates.includes(candidate))
            if (withCandidate.length === 0) return null

            const [ninth, ...ninths] = withCandidate.map(c => ninthAt(c.point)).filter((n1, i1, a) => !a.some((n2, i2) => i2 < i1 && n1 === n2))
            if (ninths.length > 0) return null;

            const remove = inNinth(withCandidate[0].point, this.sudoku)
               .filter(c => c.candidates.includes(candidate))
               .filter(c => c.point.row !== row)

            const hint: Hint = {
               actions: remove.map(c => ({
                  type: 'exclude',
                  value: candidate,
                  ...c.point,
               })),
               highlights: withCandidate.map(c => ({ ...c.point, candidates: [candidate] })),
               highlightNinths: [ninth],
               highlightRows: [row]
            }

            return hint

         })

      }).flat().filter(exists)

   }

}
