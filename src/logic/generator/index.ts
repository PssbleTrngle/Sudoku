import { arrayOf } from '../../util'
import { recursiveSolve } from '../solver'
import { canPut, inNinth, modifySudoku, numSymbols as symbols, Sudoku, withPoints } from '../Sudoku'
import History from './History'

const NUMS = arrayOf(9)

export function createEmpty(): Sudoku {
   const cells = NUMS.map(() =>
      NUMS.map(() => ({
         candidates: [],
      }))
   )
   return { cells }
}

export default function generate() {
   const builder = new History<Sudoku>()

   // Fill with number 1-9
   symbols.forEach(value => {
      builder.mark()

      // For each ninth of the sudoku
      NUMS.map(i => i - 1).forEach(i => {
         builder.step(async s => {
            const randomziedFields = inNinth(i, s).sort(() => Math.random() - 0.5)

            const possible = randomziedFields.find(it => canPut(it, value, s))
            if (possible) return modifySudoku(possible, { value })(s)
            throw new Error()
         })
      })
   })

   const carver = new History<Sudoku>()

   carver.mark()
   arrayOf(81 - 34).forEach(i => {
      if (i % 8 === 0) carver.mark()

      carver.step(async s => {
         const [cell] = withPoints(s.cells)
            .filter(c => !!c.value)
            .sort(() => Math.random() - 0.5)

         if (cell) {
            const modified = modifySudoku(cell, { value: undefined })(s)
            await recursiveSolve(modified)
            return modified
         }

         throw new Error()
      })
   })

   return History.chain(createEmpty(), builder, carver)
}
