import { arrayEqual, exists } from "../../util";
import { Hint, possibleBlockers, uniqByPoint } from "../Sudoku";
import Strategy from "./Strategy";

export default class NakedPair extends Strategy {

   getName() {
      return 'Nacktes Paar'
   }

   getHints() {

      return this.find(c => !c.value).map(cell => {
         const { row, col } = cell

         const { possibles } = cell.cell
         if (possibles.length !== 2) return null

         const blockers = possibleBlockers(this.sudoku, cell)
            .filter(uniqByPoint)
            .filter(c => c.point.col !== col || c.point.row !== row)

         const partners = blockers.filter(c => arrayEqual(c.possibles, possibles))

         if (partners.length !== 1) return null
         const [partner] = partners
         const partnerBlockers = possibleBlockers(this.sudoku, partner.point)

         return blockers
            .filter(c => !arrayEqual(c.possibles, possibles))
            .filter(c => partnerBlockers.some(b => b.point.col === c.point.col && b.point.row === c.point.row))
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
