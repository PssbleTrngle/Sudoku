import { exists } from '../../util'
import { Hint, possibleBlockers } from '../Sudoku'
import Strategy from './Strategy'

export default class ThirdEye extends Strategy {
   getName() {
      return 'Drittes Auge'
   }

   getHints() {
      // All cells without a value
      const empty = this.find(c => !c.value)

      // All cells with more than one candidate
      const [withMore, ...rest] = empty.filter(c => c.candidates.length > 2)

      // Return if there are multiple cells with more than one candidate
      if (!withMore || rest.length > 0) return []

      // Find cells that could block this cell
      const blockers = possibleBlockers(this.sudoku, withMore)

      // Search for the candidate that should be filled in
      const hit = withMore.candidates
         .map(c => {
            // All other blockers that contain this candidate
            const otherPossibilities = blockers.filter(b => b.candidates.includes(c))

            // Categorize and count by the source of influence (ninth, row or col)
            const matches = otherPossibilities
               .map(p => p.source)
               .flat()
               .reduce(
                  (o, source) => ({
                     ...o,
                     [source]: (o[source] ?? 0) + 1,
                  }),
                  {} as Record<string, number>
               )

            // Find the type of group that contains more than one cell with this candidate
            const [source] = Object.entries(matches).find(([, amount]) => amount > 1) ?? []
            if (!source) return null

            // Return that blockers from this source and the candidate
            return {
               blockers: otherPossibilities.filter(p => p.source.includes(source as any)),
               candidate: c,
            }
         })
         .filter(exists)

      // If there are multiple groups that contain more than one cell with this candidate, return
      if (hit.length !== 1) return []

      // All other candidates this cell contains
      const remove = withMore.candidates.filter(c => c !== hit[0].candidate)

      // Return the other candidates as an `exclude` hint
      const hint: Hint = {
         highlights: [
            withMore,
            ...hit[0].blockers.map(b => ({
               ...b,
               highlightedCandidates: [hit[0].candidate],
            })),
         ],
         actions: remove.map(value => ({
            ...withMore,
            type: 'exclude',
            value,
         })),
      }

      return [hint]
   }
}
