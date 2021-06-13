import { arrayEqual, exists } from '../../util'
import { connectionsOf, Hint, inGroup, possibleBlockers } from '../Sudoku'
import Strategy from './Strategy'

export default class XYWing extends Strategy {
   getName() {
      return 'XY-Wing'
   }

   getHints() {
      const withTwo = this.find(c => !c.value && c.candidates.length === 2)

      return withTwo
         .map(origin => {
            const possiblePartners = withTwo.filter(it => inGroup(it, origin)).filter(it => !arrayEqual(it.candidates, origin.candidates))

            const [ca, cb] = origin.candidates

            const [a, b] = [ca, cb].map(c => possiblePartners.filter(it => it.candidates.includes(c)))

            const pairs = a.map(a => b.filter(it => it.candidates.some(c => a.candidates.includes(c))).map(it => [a, it])).flat(1)

            return pairs.map<Hint | null>(pair => {
               if (inGroup(...pair)) return null

               const c = pair[0].candidates.find(c => !origin.candidates.includes(c))!
               const blockers = possibleBlockers(this.sudoku, ...pair).filter(it => it.candidates.includes(c))

               return {
                  actions: blockers.map(cell => ({
                     ...cell,
                     type: 'exclude',
                     value: c,
                  })),
                  highlights: [origin, ...pair].map(it => ({ ...it, highlightedCandidates: [c] })),
                  connections: connectionsOf([pair[0], origin, pair[1]]),
               }
            })
         })
         .flat()
         .filter(exists)
   }
}
