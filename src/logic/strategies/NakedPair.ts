import { arrayEqual, exists } from "../../util";
import { Hint, possibleBlockers } from "../Sudoku";
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

         return partnerBlockers
            .filter(c => !arrayEqual(c.candidates, candidates))
            .map(b =>
               b.candidates
                  .filter(i => candidates.includes(i))
                  .map<Hint>(value => ({
                     actions: [{
                        type: 'exclude',
                        value,
                        ...b.point,
                     }],
                     ...this.blockingHighlights([b]),
                     highlights: [cell.point, partner.point]
                  }))
            )

      }).filter(exists).flat(2)

   }

}
