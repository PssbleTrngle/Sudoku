import { Hint } from "../Sudoku";
import Strategy from "./Strategy";

export default class LonelyCandidates extends Strategy {

   getName() {
      return 'Einzelner Kandidat'
   }

   getHints() {

      return this.find(c => c.candidates.length === 1).map(({ point, ...cell }) =>
         cell.candidates.map<Hint>(value => ({
            actions: [{
               ...point,
               value,
               type: 'value',
            }],
         }))
      ).flat()

   }

}
