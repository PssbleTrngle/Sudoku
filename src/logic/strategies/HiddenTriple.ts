import { uniq } from 'lodash'
import { cross, crossDiff, exists } from '../../util'
import { Action, Hint, numSymbols } from '../Sudoku'
import Strategy from './Strategy'

export default class HiddenTriple extends Strategy {
   getName() {
      return 'Versteckter Dreier'
   }

   getHints() {
      return this.forGroups((cells, source) => {
         const triples = crossDiff(numSymbols, cross(numSymbols))
            .map(([a, b]) => [a, ...b])
            .filter(a => uniq(a).length === 3)

         return triples
            .map<Hint | null>(candidates => {
               const withCandidates = cells.filter(it => !it.value && candidates.some(c => it.candidates.includes(c)))

               if (withCandidates.length !== 3) return null
               if (candidates.some(c => !withCandidates.some(it => it.candidates.includes(c)))) return null

               return {
                  actions: numSymbols
                     .filter(s => !candidates.includes(s))
                     .map(value =>
                        withCandidates
                           .filter(it => it.candidates.includes(value))
                           .map(it => ({
                              ...it,
                              value,
                              type: 'exclude',
                           }))
                     )
                     .flat() as Action[],
                  highlights: withCandidates.map(it => ({ ...it, highlightedCandidates: candidates })),
                  ...this.highlightGroup(source, withCandidates[0]),
               }
            })
            .flat()
            .filter(exists)
      })
   }
}
