import { uniq } from 'lodash'
import { exists } from '../../util'
import { Action, CellWithPoint, Hint, uniqByPoint } from '../Sudoku'
import Strategy from './Strategy'

export default abstract class Naked extends Strategy {

   abstract cross(symbols: CellWithPoint[]): CellWithPoint[][] 

   abstract count(): number

   getHints() {
      return this.forGroups((cells, source) => {

         const withCandidates = cells.filter(c => !c.value && c.candidates.length <= this.count() && c.candidates.length > 1)

         const triples = this.cross(withCandidates).filter(a => a.filter(uniqByPoint).length === this.count())

         return triples.map<Hint | null>(triple => {

            const candidates = uniq(triple.map(it => it.candidates).flat())

            if (candidates.length !== this.count()) return null

            const blockers = cells.filter(c => !triple.includes(c))

            return {
               actions: candidates.map(value => blockers
                  .filter(it => it.candidates.includes(value))
                  .map(it => ({
                     ...it,
                     value,
                     type: 'exclude',
                  }))).flat() as Action[],
               highlights: triple.map(it => ({ ...it, highlightedCandidates: candidates })),
               ...this.highlightGroup(source, triple[0]),
            }

         }).flat().filter(exists)

      })

   }
}
