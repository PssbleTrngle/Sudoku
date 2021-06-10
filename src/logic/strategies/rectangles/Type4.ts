import { exists } from '../../../util'
import { Hint, ninthAt, possibleBlockers } from '../../Sudoku'
import ForbiddenRectangle from './Base'

export default class ForbiddenRectangle4 extends ForbiddenRectangle {
   getName() {
      return 'Verbotenes Rechteck Typ 4'
   }

   getHints() {
      return this.getRectangles()
         .map<Hint | null>(({ corners, candidates }) => {
            const withAdditional = corners.filter(c => c.candidates.length > 2)

            if (withAdditional.length !== 2 || withAdditional.some((c, _, a) => ninthAt(c) !== ninthAt(a[0]))) return null

            const blockers = possibleBlockers(this.sudoku, ...withAdditional)
            const requiredCanditate = candidates.find(c => !blockers.some(b => b.candidates.includes(c)))
            const removedCandidate = candidates.find(c => c !== requiredCanditate)

            if (!requiredCanditate || !removedCandidate) return null

            return {
               actions: withAdditional.map(cell => ({
                  ...cell,
                  type: 'exclude',
                  value: removedCandidate,
               })),
               highlights: corners.map(c => ({ ...c, highlightedCandidates: candidates })),
            }
         })
         .filter(exists)
   }
}
