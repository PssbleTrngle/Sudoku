import { uniq } from 'lodash'
import { cross, crossDiff, exists } from '../../util'
import { Hint, numSymbols, possibleBlockers } from '../Sudoku'
import ChainStrategy from './ChainStrategy'

export default class Skyscraper extends ChainStrategy {
   getName() {
      return 'Wolkenkratzer'
   }

   getHints() {

      return numSymbols.map(candidate => {
         const withCandidate = this.find(it => it.candidates.includes(candidate))

         return this.forRowAndCol((source, otherSource) => {

            const pillars = uniq(withCandidate.map(c => c[source])).filter(g => withCandidate.filter(it => it[source] === g).length === 2)

            return cross(pillars).map<Hint | null>(pillars => {

               const left = withCandidate.filter(it => it[source] === pillars[0])
               const right = withCandidate.filter(it => it[source] === pillars[1])
               const sameLevel = crossDiff(left, right).find(c => c.every(it => it[otherSource] === c[0][otherSource]))
               
               if (!sameLevel) return null

               const differentLevel = [...left, ...right].filter(it => !sameLevel.includes(it))
               if(uniq(differentLevel.map(it => it[otherSource])).length <= 1) return null

               const blockers = possibleBlockers(this.sudoku, ...differentLevel)

               return {
                  actions: blockers.filter(b => b.candidates.includes(candidate)).map(it => ({
                     ...it,
                     value: candidate,
                     type: 'exclude',
                  })),
                  blocked: blockers,
                  highlights: [...left, ...right].map(it => ({ ...it, highlightedCandidates: [candidate] })),
                  highlightCols: source === 'col' ? pillars : undefined,
                  highlightRows: source === 'row' ? pillars : undefined,
               }

            })

         })

      }).flat(2).filter(exists)

   }
}
