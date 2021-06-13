import slugify from 'slugify'
import { arrayOf, exists } from '../../util'
import Strategy from '../strategies/Strategy'
import { Cell, numSymbols as symbols, Sudoku } from '../Sudoku'

type SudokuLike = string | (Cell | number | number[])[][]

export interface SudokuInfo {
   name: string
   slug: string
   sudoku: Sudoku,
   strategy?: {
      create(sudoku: Sudoku): Strategy,
      slug: string,
      name: string,
      id: string,
   }
   description?: string,
}

const MAP = new Map<string, SudokuInfo>()

export function define(name: string, sudoku: SudokuLike, strategy?: { new(sudoku: Sudoku): Strategy }, description?: string) {
   const parsed = parse(sudoku)
   const strategyInstance = strategy && new strategy(parsed)
   MAP.set(name, {
      name, slug: slugify(name, { lower: true }),
      sudoku: parsed,
      strategy: strategy && {
         create: s => new strategy(s),
         slug: slugify(strategyInstance!.getName(), { lower: true }),
         name: strategyInstance!.getName(),
         id: strategy.name,
      },
      description,
   })
}

export function names() {
   return Array.from(MAP.keys()).sort()
}

export function getSudokus() {
   return Array.from(MAP.values())
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
