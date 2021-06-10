import { Hint } from '../Sudoku'
import Strategy from './Strategy'

export default class LonelyCandidates extends Strategy {
   getName() {
      return 'Einzelner Kandidat'
   }

   getHints() {
      /*
       * Find all cells that only contain a single candidate
       * If every is correctly filled in, this should be
       * the only possible value for this cell
       */
      return this.find(c => c.candidates.length === 1)
         .map(cell =>
            cell.candidates.map<Hint>(value => ({
               actions: [
                  {
                     ...cell,
                     value,
                     type: 'value',
                  },
               ],
            }))
         )
         .flat()
   }
}
