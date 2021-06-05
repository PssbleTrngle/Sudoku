import { Cell, Sudoku } from "../Sudoku";

type SudokuLike = (
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
   if(s) return s;
   throw new Error('sudoku not found')
}

function parse(json: SudokuLike): Sudoku {
   const cells: Cell[][] = json.map(r => r.map(n => {

      if (typeof n === 'number') return {
         value: (n === 0 ? undefined : n) ?? undefined,
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
require('./NakedPair');
require('./NakedTriple');
require('./HiddenPair');
require('./rectangles');
require('./ThirdEye');
require('./RBC');
require('./BRC');