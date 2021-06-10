import { arrayEqual, arrayOf, cross, exists } from '../../util'
import { CellWithPoint, Hint, inGroup, inRow, possibleBlockers } from '../Sudoku'
import Strategy from './Strategy'

export default class WWing extends Strategy {
   getName() {
      return 'W-Wing'
   }

   getHints() {
      return WWing.pairs
         .map(candidates => {
            const withPair = this.find(it => candidates.some(c => it.candidates.includes(c)))
            const onlyPair = withPair.filter(it => arrayEqual(candidates, it.candidates))

            return cross(onlyPair).map(pair => {
               if (inGroup(...pair)) return null

               const otherRows = arrayOf(9)
                  .map(i => i - 1)
                  .filter(r => !pair.some(it => it.row === r))

               return candidates.map(primary => {
                  const secondary = candidates.find(c => c !== primary)!

                  return otherRows.map<Hint | null>(row => {
                     if (inRow(row, this.sudoku).filter(it => it.candidates.includes(primary)).length !== 2) return null

                     const corners: CellWithPoint[] = pair.map(it => ({ ...it, row })).map(point => ({ ...point, ...this.sudoku.cells[point.row][point.col] }))

                     if (!corners.every(it => it.candidates.includes(primary))) return null

                     const remove = possibleBlockers(this.sudoku, ...pair).filter(it => it.candidates.includes(secondary))

                     return {
                        actions: remove.map(it => ({
                           ...it,
                           value: secondary,
                           type: 'exclude',
                        })),
                        highlights: [...pair.map(it => ({ ...it, candidates })), ...corners.map(it => ({ ...it, highlightedCandidates: [primary] }))],
                        highlightRows: [row],
                        highlightCols: corners.map(it => it.col),
                     }
                  })
               })
            })
         })
         .flat(3)
         .filter(exists)
   }
}
