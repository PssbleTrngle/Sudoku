import { arrayEqual, exists } from "../../util";
import { Hint, possibleBlockers } from "../Sudoku";
import Strategy from "./Strategy";

export default abstract class Naked extends Strategy {

   abstract partnerCount(): number

   getHints() {

      const partnerCount = this.partnerCount()

      return this.find(c => !c.value && c.candidates.length === 2).map(cell => {
         const { candidates } = cell
         if (candidates.length !== 2) return null

         const blockers = possibleBlockers(this.sudoku, cell)

         const partners = [...blockers, cell]
            .filter(c => c.candidates.length === 2)
            .filter((c1, i1, a) => !a.some((c2, i2) => i2 < i1 && arrayEqual(c1.candidates, c2.candidates)))
            .filter((p1, i1, a) => p1.candidates.every(c => a.filter((p2, i2) => i1 !== i2 && p2.candidates.includes(c)).length === 1))

         if (partners.length !== partnerCount) return null

         const partnerBlockers = possibleBlockers(this.sudoku, ...partners)

         return partnerBlockers
            .filter(c => !arrayEqual(c.candidates, candidates))
            .map(b =>
               b.candidates
                  .filter(i => candidates.includes(i))
                  .map<Hint>(value => ({
                     actions: [{
                        ...b,
                        type: 'exclude',
                        value,
                     }],
                     ...this.blockingHighlights([b]),
                     highlights: partners
                  }))
            )

      }).filter(exists).flat(2)

   }

}
