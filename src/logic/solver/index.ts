import { exists } from '../../util'
import Observer from '../generator/Observer'
import { canPut, modifySudoku, numSymbols, Sudoku, withPoints } from '../Sudoku'

export default function solve(sudoku: Sudoku, firstOnly = true) {
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
      const { col: x, row: y } = empty
      const candidates = numSymbols.filter(i => canPut(empty, i, sudoku))
      const modfied = candidates.map(value => modifySudoku(x, y, { value })(sudoku))

      if (onlyFirst) {
         for (const mod of modfied) {
            const solved = await recursiveSolve(mod, true)
            if (solved) return solved
         }
      } else {
         const solutions = await Promise.all(
            modfied.map(async mod => {
               return recursiveSolve(mod)
            })
         ).then(a => a.filter(exists).filter((s1, i1, a) => !a.some((s2, i2) => i2 < i1 && idendical(s1, s2))))

         if (solutions.length > 1) throw new Error('More than one solution')
         else return solutions[0]
      }
   } else {
      return sudoku
   }

   return null
}

function idendical(a: Sudoku, b: Sudoku) {
   return withPoints(a.cells).every(c => b.cells[c.row][c.col].value === c.value)
}
