import { arrayEqual, exists } from "../../util";
import { Hint, possibleBlockers } from "../Sudoku";
import Strategy from "./Strategy";

export default class NakedTriple extends Strategy {

   getName() {
      return 'Nackter Dreier'
   }

   getHints() {

      return this.find(c => !c.value && c.candidates.length === 2).map(cell => {
         const { candidates } = cell.cell
         if (candidates.length !== 2) return null

         const blockers = possibleBlockers(this.sudoku, cell)

         const partners = blockers.filter(c => arrayEqual(c.candidates, candidates))

         if (partners.length !== 1) return null
         const [partner] = partners
         const partnerBlockers = possibleBlockers(this.sudoku, partner.point, cell)

         return partnerBlockers
            .filter(c => !arrayEqual(c.candidates, candidates))
            .map(b =>
               b.candidates
                  .filter(i => candidates.includes(i))
                  .map<Hint>(value => ({
                     type: 'exclude',
                     value,
                     ...b.point,
                     ...this.blockingHighlights([b]),
                     highlights: [cell, partner.point]
                  }))
            )

      }).filter(exists).flat(2)

   }

}
