import { arrayEqual, exists } from '../../../util'
import { Hint, inGroup, possibleBlockers } from '../../Sudoku'
import ForbiddenRectangle from './Base'

export default class ForbiddenRectangle2 extends ForbiddenRectangle {
   getName() {
      return 'Verbotenes Rechteck Typ 2'
   }

   getHints() {
      return this.getRectangles()
         .map<Hint | null>(({ corners, candidates }) => {
            const withAdditional = corners.filter(c => c.candidates.length === 3)

            if (withAdditional.length !== 2 || withAdditional.some((c, _, a) => !arrayEqual(c.candidates, a[0].candidates)) || !inGroup(...withAdditional)) return null

            const blockers = possibleBlockers(this.sudoku, ...withAdditional)
            const [candidate] = withAdditional[0].candidates.filter(c => !candidates.includes(c))

            if (!blockers.some(b => b.candidates.includes(candidate))) return null

            return {
               actions: blockers.map(blocker => ({
                  ...blocker,
                  type: 'exclude',
                  value: candidate,
               })),
               highlights: corners.map(c => ({ ...c, highlightedCandidates: candidates })),
            }
         })
         .filter(exists)
   }
}
