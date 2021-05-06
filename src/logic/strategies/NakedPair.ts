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

         const blockers = possibleBlockers(row, col, this.sudoku)
            .filter(uniqByPoint)
            .filter(c => c.point.x !== row || c.point.y !== col)

         const partners = blockers.filter(c => arrayEqual(c.possibles, possibles))

         if (partners.length !== 1) return null
         const [partner] = partners
         const partnerBlockers = possibleBlockers(partner.point.x, partner.point.y, this.sudoku)

         return blockers
            .filter(c => !arrayEqual(c.possibles, possibles))
            .filter(c => partnerBlockers.some(b => b.point.x === c.point.x && b.point.y === c.point.y))
            .map(b =>
               b.possibles
                  .filter(i => possibles.includes(i))
                  .map<Hint>(value => ({
                     type: 'exclude',
                     col: b.point.y,
                     row: b.point.x,
                     value,
                     ...this.blockingHighlights([b]),
                     highlights: [
                        cell, {
                           row: partner.point.x,
                           col: partner.point.y,
                        }
                     ]
                  }))
            )

      }).filter(exists).flat(2)

   }

}
