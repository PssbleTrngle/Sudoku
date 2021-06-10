import { CellWithPoint } from '../Sudoku'
import Strategy from './Strategy'

export interface Chain {
   start: CellWithPoint
   end: CellWithPoint
   chains: CellWithPoint[][]
}

export default abstract class ChainStrategy extends Strategy {
   getChains(endPredicate: (c: CellWithPoint) => boolean, connectionPredicate: (a: CellWithPoint, b: CellWithPoint) => boolean, cells?: CellWithPoint[], maxLength = 10): Chain[] {
      const all = this.cells() ?? cells

      const endpoints = all.filter(endPredicate)

      const pairs = endpoints.map((c1, i1, a) => a.filter((_, i2) => i2 > i1).map(c2 => [c1, c2])).flat()

      const next = (chain: CellWithPoint[], to: CellWithPoint): CellWithPoint[][] => {
         if (chain.length < 1) return []
         if (chain.includes(to)) return [chain]
         const start = chain[chain.length - 1]

         if (chain.length > maxLength) return []

         const nextCells = all.filter(it => !chain.some(c => c.row === it.row && c.col === it.col)).filter(it => connectionPredicate(start, it))

         return nextCells.map(n => next([...chain, n], to)).flat(1)
      }

      return pairs
         .map(([start, end]) => {
            const chains = next([start], end).filter(c => c.length > 2)

            return { start, end, chains }
         })
         .filter(c => c.chains.length > 0)
   }
}
