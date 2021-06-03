import { exists } from "../../../util";
import { CellWithPoint, Hint, ninthAt, possibleBlockers } from "../../Sudoku";
import ForbiddenRectangle from './Base';

export interface Rectangle {
   corners: CellWithPoint[]
   candidates: number[]
}

export default class ForbiddenRectangle4 extends ForbiddenRectangle {

   getName() {
      return 'Verbotenes Rechteck Typ 4'
   }

   getHints() {

      return this.getRectangles().map<Hint | null>(({ corners, candidates }) => {

         const withAdditional = corners.filter(c => c.candidates.length > 2)

         if (withAdditional.length !== 2 || withAdditional.some((c, _, a) =>
            ninthAt(c.point) !== ninthAt(a[0].point)
         )) return null;

         const blockers = possibleBlockers(this.sudoku, ...withAdditional.map(c => c.point))
         const requiredCanditate = candidates.find(c => !blockers.some(b => b.candidates.includes(c)))
         const removedCandidate = candidates.find(c => c !== requiredCanditate)

         console.log(requiredCanditate, removedCandidate)

         if (!requiredCanditate || !removedCandidate) return null

         return {
            actions: withAdditional.map(cell => ({
               ...cell.point,
               type: 'exclude',
               value: removedCandidate,
            })),
            highlights: corners.map(c => ({ ...c.point, candidates })),
         }

      }).filter(exists)

   }

}
