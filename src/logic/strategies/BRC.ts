import { arrayOf, exists } from '../../util'
import { Hint, inRow, ninthAt, symbols } from '../Sudoku'
import Strategy from './Strategy'

export default class BRC extends Strategy {
   getName() {
      return 'Block-Reihe-Check'
   }

   getHints() {
      const empty = this.find(c => !c.value)

      // Checking for every ninth of the field
      return arrayOf(9)
         .map(ninth => {
            // All cells in this ninth
            const inNinth = empty.filter(c => ninthAt(c) === ninth)

            // Checking for every possible number from 1-9
            return symbols.map(candidate => {
               // Find all cells in the ninth with this candidate
               // Return when no cells contains it
               const withCandidate = inNinth.filter(c => c.candidates.includes(candidate))
               if (withCandidate.length === 0) return null

               // Check if all the cells with this candidate are in the same row
               const [row, ...rows] = withCandidate.map(c => c.row).filter((n1, i1, a) => !a.some((n2, i2) => i2 < i1 && n1 === n2))
               if (rows.length > 0) return null

               // Search for other cells in this row that contain the candidate
               const remove = inRow(row, this.sudoku)
                  .filter(c => c.candidates.includes(candidate))
                  .filter(c => ninthAt(c) !== ninth)

               // Return all found cells as an `exclude` hint
               const hint: Hint = {
                  actions: remove.map(c => ({
                     type: 'exclude',
                     value: candidate,
                     ...c,
                  })),
                  highlights: withCandidate.map(c => ({ ...c, highlightedCandidates: [candidate] })),
                  highlightNinths: [ninth],
                  highlightRows: [row],
               }

               return hint
            })
         })
         .flat()
         .filter(exists)
   }
}
