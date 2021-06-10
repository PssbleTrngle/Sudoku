import { arrayOf, exists } from '../../util'
import Strategy from '../strategies/Strategy'
import { Cell, Sudoku, symbols } from '../Sudoku'

type SudokuLike = string | (Cell | number | number[])[][]

export interface SudokuInfo {
   sudoku: Sudoku,
   strategy?: string
   description?: string,
}

const MAP = new Map<string, SudokuInfo>()

export function define(name: string, sudoku: SudokuLike, strategy?: { new(sudoku: Sudoku): Strategy }, description?: string) {
   const parsed = parse(sudoku)
   MAP.set(name, {
      sudoku: parsed,
      strategy: strategy && new strategy(parsed).getName(),
      description,
   })
}

export function names() {
   return Array.from(MAP.keys())
}

export async function getSudoku(name: string) {
   const s = MAP.get(name)
   if (s) return s
   throw new Error('sudoku not found')
}

function parse(value: SudokuLike): Sudoku {
   const json =
      typeof value === 'string'
         ? value
            .trim()
            .split('\n')
            .map(line =>
               line
                  .trim()
                  .split('')
                  .map(s => Number.parseInt(s))
            )
         : value

   const size = arrayOf(9)
   const cells: Cell[][] = size.map((_, row) =>
      size.map((_, col) => {
         const n = json[row]?.[col] ?? 0

         if (typeof n === 'number')
            return {
               value: symbols[n - 1],
               candidates: [],
            }
         else if (Array.isArray(n))
            return {
               value: undefined,
               candidates: n
                  .map(n => symbols[n - 1])
                  .filter(exists)
                  .sort(),
            }
         else if (typeof n === 'object') return n as Cell
         else throw new Error('Not a valid sudoku')
      })
   )

   return { cells }
}

require('./import')
