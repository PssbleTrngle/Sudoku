import { cross, exists } from '../../util'
import { CellWithPoint, connectionsOf, Hint, possibleBlockers, sharedGroups, symbols } from '../Sudoku'
import ChainStrategy from './ChainStrategy'

export default class XChain extends ChainStrategy {
   getName() {
      return 'X-Kette'
   }

   getHints() {
      return symbols
         .map(candidate => {
            const predicate = (it: CellWithPoint) => {
               if (!it.candidates.includes(candidate)) return false
               const blockers = possibleBlockers(this.sudoku, it)
               return ['col', 'row', 'ninth'].some(s => blockers.filter(b => b.source.includes(s as any) && b.candidates.includes(candidate)).length === 1)
            }

            const cells = this.find(predicate)

            const chains = this.getChains(
               predicate,
               (a, b) => {
                  if ([a, b].some(it => !it.candidates.includes(candidate))) return false
                  const points = [a, b]
                  const shared = sharedGroups(...points)
                  if (shared.length === 0) return false
                  const blockers = possibleBlockers(this.sudoku, ...points)
                  return shared.some(s => blockers.filter(b => b.source.includes(s) && b.candidates.includes(candidate)).length === 0)
               },
               cells
            )

            return chains.map(({ chains }) =>
               chains
                  .filter(C => C.length > 4)
                  .map<Hint>(chain => {
                     const connections = connectionsOf(chain)

                     const eitherOrs = cross(
                        chain.filter((_, i) => i % 2 === 0),
                        chain.filter((_, i) => i % 2 === 1)
                     )

                     const blockers = eitherOrs
                        .map(c =>
                           possibleBlockers(this.sudoku, ...c)
                              .filter(it => it.candidates.includes(candidate))
                              .map(b => ({ ...b, by: c }))
                        )
                        .flat()
                        .filter(b => !chain.some(it => it.col === b.col && it.row === b.row))

                     return {
                        actions: blockers.map(c => ({
                           ...c,
                           value: candidate,
                           type: 'exclude',
                        })),
                        connections,
                        highlights: chain.map(c => ({ ...c, highlightedCandidates: [candidate] })),
                     }
                  })
            )
         })
         .flat(2)
         .filter(exists)
   }
}
