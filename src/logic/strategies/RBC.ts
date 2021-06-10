import { arrayOf, exists } from "../../util";
import { Hint, inNinth, ninthAt, symbols } from "../Sudoku";
import Strategy from "./Strategy";

export default class RBC extends Strategy {

   getName() {
      return 'Reihe-Block-Check'
   }

   getHints() {

      const empty = this.find(c => !c.value)

      // Checking for every row of the field
      return arrayOf(9).map(row => {

         // All cells in this row
         const inRow = empty.filter(c => c.point.row === row)

         // Checking for every possible number from 1-9
         return symbols.map(candidate => {

            // Find all cells in the row with this candidate
            // Return when no cells contains it
            const withCandidate = inRow.filter(c => c.candidates.includes(candidate))
            if (withCandidate.length === 0) return null

            // Check if all the cells with this candidate are in the same ninth
            const [ninth, ...ninths] = withCandidate.map(c => ninthAt(c.point)).filter((n1, i1, a) => !a.some((n2, i2) => i2 < i1 && n1 === n2))
            if (ninths.length > 0) return null;

            // Search for other cells in this ninth that contain the candidate
            const remove = inNinth(withCandidate[0].point, this.sudoku)
               .filter(c => c.candidates.includes(candidate))
               .filter(c => c.point.row !== row)

            // Return all found cells as an `exclude` hint
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
