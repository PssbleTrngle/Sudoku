import { arrayEqual, exists } from "../../util";
import { Action, possibleBlockers } from "../Sudoku";
import Strategy from "./Strategy";

export default class NakedPair extends Strategy {

   getName() {
      return 'Nacktes Paar'
   }

   getHints() {

      return this.find(c => !c.value && c.candidates.length === 2).map(cell => {
         const { candidates } = cell
         if (candidates.length !== 2) return null

         const blockers = possibleBlockers(this.sudoku, cell.point)

         const partners = blockers.filter(c => arrayEqual(c.candidates, candidates))

         if (partners.length !== 1) return null
         const [partner] = partners
         const partnerBlockers = possibleBlockers(this.sudoku, partner.point, cell.point)

         return {
            ...this.blockingHighlights(partnerBlockers),
            highlights: [cell.point, partner.point],
            actions: partnerBlockers
               .filter(c => !arrayEqual(c.candidates, candidates))
               .map<Action[]>(b => b.candidates
                  .filter(i => candidates.includes(i))
                  .map(value => ({
                     type: 'exclude',
                     value,
                     ...b.point,
                  }))
               ).flat()
         }

      }).filter(exists)

   }

}
