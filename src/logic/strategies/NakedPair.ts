import { arrayEqual, exists } from "../../util";
import { Hint, possibleBlockers } from "../Sudoku";
import Strategy from "./Strategy";

export default class NakedPair extends Strategy {

   getName() {
      return 'Nacktes Paar'
   }

   getHints() {

      return this.find(c => !c.value).map(cell => {
            const { possibles } = cell.cell
         if (possibles.length !== 2) return null

         const blockers = possibleBlockers(this.sudoku, cell)
            
         const partners = blockers.filter(c => arrayEqual(c.possibles, possibles))

         if (partners.length !== 1) return null
         const [partner] = partners
         const partnerBlockers = possibleBlockers(this.sudoku, partner.point, cell)

         return partnerBlockers
            .filter(c => !arrayEqual(c.possibles, possibles))
            .map(b =>
               b.possibles
                  .filter(i => possibles.includes(i))
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
