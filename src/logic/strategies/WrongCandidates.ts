import { exists } from '../../util'
import { blockedBy, Hint } from '../Sudoku'
import Strategy from './Strategy'

export default class WrongCandidates extends Strategy {
   getName() {
      return 'Falscher Kandidat'
   }

   getHints() {
      // Search for candidates that are also contained in the group as another cell's value
      return this.find(c => c.candidates.length > 0)
         .map(cell =>
            cell.candidates.map(value => {
               // Search other cells that are in the same group as this one
               // and already contain the value
               const blockers = blockedBy(cell, value, this.sudoku)
               if (blockers.length === 0) return null
               else {
                  const hint: Hint = {
                     actions: [
                        {
                           ...cell,
                           value,
                           type: 'exclude',
                        },
                     ],
                     ...this.blockingHighlights(blockers),
                  }

                  return hint
               }
            })
         )
         .flat()
         .filter(exists)
   }
}
