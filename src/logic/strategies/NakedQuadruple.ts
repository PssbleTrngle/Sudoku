import { uniq } from 'lodash'
import { cross, crossDiff, exists } from '../../util'
import { Action, Hint, uniqByPoint } from '../Sudoku'
import Strategy from './Strategy'

export default class NakedQuadruple extends Strategy {
   getName() {
      return 'Nackter Vierer'
   }

   getHints() {

      return this.forGroups((cells, source) => {

         const withCandidates = cells.filter(c => !c.value && c.candidates.length <= 4 && c.candidates.length > 1)

         const quadruples = crossDiff(withCandidates,
            crossDiff(withCandidates, cross(withCandidates)).map(([a, b]) => [a, ...b])
         ).map(([a, b]) => [a, ...b]).filter(a => a.filter(uniqByPoint).length === 4)

         return quadruples.map<Hint | null>(quadruple => {

            const candidates = uniq(quadruple.map(it => it.candidates).flat())

            if (candidates.length !== 4) return null

            const blockers = cells.filter(c => !quadruple.includes(c))

            return {
               actions: candidates.map(value => blockers
                  .filter(it => it.candidates.includes(value))
                  .map(it => ({
                     ...it,
                     value,
                     type: 'exclude',
                  }))).flat() as Action[],
               highlights: quadruple.map(it => ({ ...it, highlightedCandidates: candidates })),
               ...this.highlightGroup(source, quadruple[0]),
            }

         }).flat().filter(exists)

      })
   }
}
