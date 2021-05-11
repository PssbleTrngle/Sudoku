import { arrayOf, exists } from '../../util';
import Observer from '../generator/Observer';
import { canPut, modifySudoku, Sudoku, withPoints } from "../Sudoku";

const NUMS = arrayOf(9)

export default function solve(sudoku: Sudoku, firstOnly = true) {


   /*
   const solver = new History(sudoku)

   const emptyCells = withPoints(sudoku.cells).filter(c => !c.value)


   emptyCells.forEach(({ point }, i) => {

      if (i % Math.round(emptyCells.length / 9) === 0) solver.mark()

      solver.step(async (s, attempt) => {

         const possibles = NUMS.filter(i => canPut(point.x, point.y, i, solver.current))
         console.log(possibles, attempt)
         if (possibles.length === 0 || attempt > possibles.length) throw new Error()

         const value = possibles[attempt % possibles.length]
         return modifySudoku(point.x, point.y, { value })(s)

      })


   })
   */

   const observer = new Observer<Sudoku>()

   window.setTimeout(() =>
      recursiveSolve(sudoku, firstOnly)
         .then(s => {
            if (!s) throw new Error('Unsolveable')
            observer.notify(s)
            observer.finish()
         })
         .catch(e => observer.cancel(e.message))
   )

   return observer
}

export async function recursiveSolve(sudoku: Sudoku, onlyFirst = false): Promise<Sudoku | null> {

   const empty = withPoints(sudoku.cells).find(c => !c.value)

   if (empty) {
      const { col: x, row: y } = empty.point
      const candidates = NUMS.filter(i => canPut(empty.point, i, sudoku))
      const modfied = candidates.map(value => modifySudoku(x, y, { value })(sudoku))

      if (onlyFirst) {

         for (const mod of modfied) {
            const solved = await recursiveSolve(mod, true)
            if (solved) return solved
         }

      } else {

         const solutions = await Promise.all(modfied.map(async mod => {
            return recursiveSolve(mod)
         })).then(a => a.filter(exists))

         if (solutions.length > 1) throw new Error('More than one solution')
         else return solutions[0]

      }

   } else {
      return sudoku
   }

   return null

}