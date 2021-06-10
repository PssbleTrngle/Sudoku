import { arrayOf } from "../../util";
import { Cell, Sudoku } from "../Sudoku";

type SudokuLike = string | (
   Cell | number | number[]
)[][]

const MAP = new Map<string, Sudoku>()

export function define(name: string, sudoku: SudokuLike) {
   MAP.set(name, parse(sudoku))
}

export function names() {
   return Array.from(MAP.keys())
}

export async function getSudoku(name: string) {
   const s = MAP.get(name)
   if (s) return s;
   throw new Error('sudoku not found')
}

function parse(value: SudokuLike): Sudoku {

   const json = typeof value === 'string'
      ? value.trim().split('\n').map(line => line.trim().split('').map(s => Number.parseInt(s)))
      : value

   if (typeof value === 'string') console.log(json)

   const size = arrayOf(9)
   const cells: Cell[][] = size.map((_, row) => size.map((_, col) => {
      const n = json[row]?.[col] ?? 0

      if (typeof n === 'number') return {
         value: ((n === 0 || isNaN(n)) ? undefined : n) ?? undefined,
         candidates: [],
      }

      else if (Array.isArray(n)) return {
         value: undefined,
         candidates: n,
      }

      else if (typeof n === 'object') return n as Cell

      else throw new Error('Not a valid sudoku')

   }));

   return { cells }
}

require('./1');
require('./2');
require('./Versteckter Single');
require('./Versteckter Single 2');
require('./X Wing');
require('./XYWing');
require('./NakedPair');
require('./NakedTriple');
require('./HiddenPair');
require('./rectangles');
require('./ThirdEye');
require('./RBC');
require('./BRC');
require('./XChain');
require('./WWing');