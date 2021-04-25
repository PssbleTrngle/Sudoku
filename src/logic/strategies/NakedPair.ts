import { arrayEqual, exists } from "../../util";
import { Hint, possibleBlockers, possiblesValues } from "../Sudoku";
import Strategy from "./Strategy";

export default class NakedPair extends Strategy {

   getName() {
      return 'Nacktes Paar'
   }

   getHints() {

      return this.find(c => !c.value).map(cell => {
         const { row, col } = cell

         const possible = possiblesValues(row, col, this.sudoku)
         if (possible.length !== 2) return null

         const blockers = possibleBlockers(row, col, this.sudoku)

         const partners = blockers.filter(c => {
            const p = possiblesValues(c.point.x, c.point.y, this.sudoku)
            return arrayEqual(p, possible)
         })

         if (partners.length !== 1) return null

         return blockers.map(b =>
            possiblesValues(b.point.x, b.point.y, this.sudoku)
               .filter(i => possible.includes(i))
               .map<Hint>(value => ({
                  type: 'exclude',
                  col: b.point.y,
                  row: b.point.x,
                  value,
                  highlights: [
                     cell, {
                        row: partners[0].point.x,
                        col: partners[0].point.y,
                     }
                  ]
               }))
         )

      }).filter(exists).flat(2)

   }

}
