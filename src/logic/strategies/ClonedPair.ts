import { arrayEqual, crossDiff, exists } from '../../util'
import { Action, connectionsOf, Hint, possibleBlockers, sharedGroups } from '../Sudoku'
import ChainStrategy from './ChainStrategy'

export default class ClonedPair extends ChainStrategy {
   getName() {
      return 'Geklonte Paare'
   }

   getHints() {
      return this.pairs
         .map<Hint | null>(candidates => {
            const [chain] = this.getChains(
               it => arrayEqual(it.candidates, candidates),
               (a, b) => {
                  if (!arrayEqual(b.candidates, candidates)) return false
                  const shared = sharedGroups(a, b)
                  if (shared.length === 0) return false
                  const blockers = possibleBlockers(this.sudoku, a, b)
                  return shared.some(s => blockers.filter(b => b.source.includes(s) && candidates.some(c => b.candidates.includes(c))).length === 0)
               }
            )
               .map(c => c.chains)
               .flat()
               .sort((a, b) => b.length - a.length)

            if (!chain) return null

            const pair = crossDiff(
               chain.filter((_, i) => i % 2 === 0),
               chain.filter((_, i) => i % 2 === 1)
            )

            const remove = pair.map(p => possibleBlockers(this.sudoku, ...p).filter(it => candidates.some(c => it.candidates.includes(c)))).flat()

            return {
               actions: candidates
                  .map(value =>
                     remove.map(it => ({
                        ...it,
                        type: 'exclude',
                        value,
                     }))
                  )
                  .flat() as Action[],
               ...this.blockingHighlights(remove),
               highlights: chain.map(it => ({ ...it, highlightedCandidates: candidates })),
               connections: connectionsOf(chain),
            }
         })
         .filter(exists)
   }
}
