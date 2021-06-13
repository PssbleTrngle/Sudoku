import { uniq } from 'lodash'
import { exists } from '../../../util'
import { CellWithPoint, connectionsOf, Hint, inGroup, possibleBlockers, sharedGroups, uniqByPoint } from '../../Sudoku'
import ForbiddenRectangle from './Base'

export default class ForbiddenRectangle3 extends ForbiddenRectangle {
   getName() {
      return 'Verbotenes Rechteck Typ 3'
   }

   getChains(
      starts: CellWithPoint[],
      connectionPredicate: (a: CellWithPoint, b: CellWithPoint, chain: CellWithPoint[]) => boolean,
      canEnd: (last: CellWithPoint, chain: CellWithPoint[]) => boolean,
      cells?: CellWithPoint[],
      maxLength = 10
   ): CellWithPoint[][] {
      const all = this.cells() ?? cells

      const next = (chain: CellWithPoint[]): CellWithPoint[][] => {
         if (chain.length < 1) return []
         const previous = chain[chain.length - 1]

         if (chain.length > maxLength) return [chain]

         const nextCells = all.filter(it => !chain.some(c => c.row === it.row && c.col === it.col)).filter(it => connectionPredicate(previous, it, chain))

         if (nextCells.length === 0) return [chain]

         const nextChains = nextCells.map(n => next([...chain, n])).flat(1)
         if (canEnd(previous, chain)) return [chain, ...nextChains]
         else return nextChains
      }

      return starts
         .map(start => {
            const chains = next([start]).filter(c => c.length > 1)
            if (chains.length === 0) return null
            return chains
         })
         .filter(exists)
         .filter(c => c.length > 0)
         .flat()
   }

   getHints() {
      return this.getRectangles().map(({ corners, candidates }) => {
         const withAdditional = corners.filter(c => c.candidates.length > 2)

         if (withAdditional.length !== 2) return null
         if (sharedGroups(...withAdditional).length === 0) return null

         const otherCandidates = uniq(withAdditional.map(it => it.candidates).flat()).filter(c => !candidates.includes(c))
         const blockers = possibleBlockers(this.sudoku, ...withAdditional)

         const chains = otherCandidates.map(candidate => {

            const starts = blockers.filter(it => it.candidates.length === 2 && it.candidates.includes(candidate))

            const hasOneRemaining = (cell: CellWithPoint, chain: CellWithPoint[]) => {
               const blockers = chain.filter(it => inGroup(it, cell))
               const removed = uniq([candidate, ...blockers.map(it => it.candidates)].flat())
               return cell.candidates.filter(c => !removed.includes(c)).length === 1
            }

            const getTargets = (previous: CellWithPoint, chain: CellWithPoint[]) => {
               const targets = possibleBlockers(this.sudoku, previous).filter(it => !it.value && ![...corners, ...chain].some(c => c.row === it.row && c.col === it.col))

               return targets.map(target => {
                  const blockers = chain.filter(it => inGroup(it, target))
                  const removed = uniq([candidate, ...blockers.map(it => it.candidates)].flat())
                  return { target, removed }
               }).filter(it => it.removed.length > 0)
            }

            return this.getChains(
               starts,
               (a, b, chain) => {
                  if (!hasOneRemaining(a, chain.slice(0, chain.length - 1))) return false
                  if (corners.some(it => it.col === b.col && it.row === b.row)) return false
                  if (!inGroup(...withAdditional, a, b)) return false
                  if (hasOneRemaining(b, chain)) return true
                  return getTargets(a, chain).some(it => it.target.col === b.col && it.target.row === b.row)
               },
               (previous, chain) => !hasOneRemaining(previous, chain),
               this.cells(),
               5
            )

         })

         const targets = chains.flat().map(c => c[c.length - 1]).filter(uniqByPoint)

         return targets.map<Hint | null>(target => {

            const attackingChains = chains.map(c => c.find(it => it[it.length - 1].row === target.row && it[it.length - 1].col === target.col)).filter(exists)
            if (attackingChains.length !== otherCandidates.length) return null

            const remove = uniq(attackingChains.map((c, i) => [...c.slice(0, c.length - 1).map(it => it.candidates), otherCandidates[i]].flat()).flat())

            return {
               actions: remove.filter(c => target.candidates.includes(c)).map(value => ({
                  ...target,
                  type: 'exclude',
                  value,
               })),
               highlights: corners.map(c => ({ ...c, highlightedCandidates: candidates })),
               connections: attackingChains.map(c =>
                  withAdditional.map(it => connectionsOf([it, ...c]))
               ).flat(2),
               blocked: attackingChains.flat(),
            }

         })

      })
         .flat()
         .filter(exists)
   }
}
