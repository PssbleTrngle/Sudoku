import { uniq } from 'lodash'
import { cross, crossDiff, exists } from '../../util'
import { Hint } from '../Sudoku'
import Strategy from './Strategy'

export default class Swordfish extends Strategy {
   getName() {
      return 'Schwertfisch'
   }

   getHints() {

      const sources = ['row', 'col'] as Array<'row' | 'col'>

      return this.symbols.map(candidate => {

         const withCandidate = this.find(it => it.candidates.includes(candidate))

         return sources.map(source => {
            const otherSource = sources.find(g => g !== source)!

            const groups = uniq(withCandidate.map(it => it[source])).sort()
            const triples = crossDiff(groups, cross(groups)).filter(([a, b]) => b.every(b => a < b)).map(([a, b]) => [a, ...b])

            return triples.map<Hint | null>(triple => {


               const inGroups = withCandidate.filter(it => triple.some(g => it[source] === g))
               const otherGroups = uniq(inGroups.map(it => it[otherSource]))

               if (otherGroups.length !== 3) return null

               const blockers = otherGroups.map(g => withCandidate.filter(it => it[otherSource] === g && !inGroups.includes(it))).flat()

               console.log(triple, source)

               return {
                  actions: blockers.map(it => ({
                     ...it,
                     value: candidate,
                     type: 'exclude',
                  })),
                  highlights: inGroups.map(it => ({ ...it, highlightedCandidates: [candidate] })),
                  highlightCols: source === 'col' ? triple : otherGroups,
                  highlightRows: source === 'row' ? triple : otherGroups,
               }

            })

         })

      })
         .flat(2)
         .filter(exists)
   }
}
