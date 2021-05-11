import { arrayOf, exists } from "../../util";
import { Hint, ninthAt, possibleBlockers } from "../Sudoku";
import Strategy from "./Strategy";

export default class NakedSingle extends Strategy {

   getName() {
      return 'Nackter Single'
   }

   getHints() {

      return this.find(c => !c.value).map(cell => {

         const takenValues = possibleBlockers(this.sudoku, cell.point).filter(c => !!c.value)
         const possibleValues = arrayOf(9).filter(i => !takenValues.some(c => c.value === i))

         if (possibleValues.length === 1) {
            const [value] = possibleValues
            const sources = takenValues.map(v => v.source).flat()

            const hint: Hint = {
               ...cell, ...cell.point, value,
               type: 'value',
               highlights: takenValues.map(c => c.point),
               highlightRows: sources.includes('row') ? [cell.point.row] : undefined,
               highlightCols: sources.includes('col') ? [cell.point.col] : undefined,
               highlightNinths: sources.includes('ninth') ? [ninthAt(cell.point)] : undefined,
            }

            return hint;
         }

         return null;

      }).filter(exists)

   }

}
