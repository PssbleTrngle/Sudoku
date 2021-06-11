import { arrayOf, crossDiff, exists } from '../../util'
import { connectionsOf, Hint, inCol, inRow, ninthAt, possibleBlockers } from '../Sudoku'
import Strategy from './Strategy'

export default class Kite extends Strategy {
   getName() {
      return 'Drachen'
   }

   getHints() {
      const nums = arrayOf(9).map(i => i - 1)

      return this.symbols
         .map(candidate => {

            return nums.map(row => {

               const rowCells = inRow(row, this.sudoku).filter(it => it.candidates.includes(candidate))
               if (rowCells.length !== 2) return null

               return nums.filter(col => !rowCells.some(it => it.col === col)).map<Hint | null>(col => {

                  const colCells = inCol(col, this.sudoku).filter(it => it.candidates.includes(candidate))
                  if (colCells.length !== 2) return null

                  const points = [...colCells, ...rowCells]

                  const [sameNinth, ...rest] = crossDiff(colCells, rowCells).filter(([a, b]) => ninthAt(a) === ninthAt(b))
                  if (!sameNinth || rest.length > 0) return null

                  const [rowSniper, colSniper] = [rowCells, colCells].map(c => c.find(it => !sameNinth.includes(it)))
                  if (!rowSniper || !colSniper) return null

                  const blockers = possibleBlockers(this.sudoku, rowSniper, colSniper).filter(it => it.candidates.includes(candidate))

                  return {
                     actions: blockers.map(it => ({
                        ...it,
                        value: candidate,
                        type: 'exclude',
                     })),
                     highlights: points.map(it => ({ ...it, highlightedCandidates: [candidate] })),
                     highlightCols: [col],
                     highlightRows: [row],
                     connections: blockers.map(it =>
                        connectionsOf([rowSniper, it, colSniper])
                     ).flat(),
                  }

               })

            })

         })
         .flat(3)
         .filter(exists)
   }
}
