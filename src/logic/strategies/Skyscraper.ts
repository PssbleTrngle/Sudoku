import { uniq } from 'lodash'
import { cross, crossDiff, exists } from '../../util'
import { Hint, ninthAt, numSymbols, possibleBlockers } from '../Sudoku'
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
               const points = [...left, ...right]
               
               if (uniq(points.map(it => ninthAt(it))).length < 4) return null

               const sameLevel = crossDiff(left, right).find(c => c.every(it => it[otherSource] === c[0][otherSource]))
               if (!sameLevel) return null

               const differentLevel = points.filter(it => !sameLevel.includes(it))
               if (uniq(differentLevel.map(it => it[otherSource])).length <= 1) return null

               const blockers = possibleBlockers(this.sudoku, ...differentLevel)

               return {
                  actions: blockers.filter(b => b.candidates.includes(candidate)).map(it => ({
                     ...it,
                     value: candidate,
                     type: 'exclude',
                  })),
                  blocked: blockers,
                  highlights: points.map(it => ({ ...it, highlightedCandidates: [candidate] })),
                  highlightCols: source === 'col' ? pillars : undefined,
                  highlightRows: source === 'row' ? pillars : undefined,
               }

            })

         })

      }).flat(2).filter(exists)

   }
}
