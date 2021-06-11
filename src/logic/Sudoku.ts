import { SetStateAction } from 'react'
import { arrayOf } from '../util'

export const numSymbols = arrayOf(9).map(i => i.toString())
//export const symbols = 'ABCDEFGHI'.split('')
export type Symbol = string

export interface Cell {
   value?: Symbol
   candidates: Symbol[]
}

export type Sudoku = {
   cells: Cell[][]
}

export interface Point {
   col: number
   row: number
}

export interface ExactPoint extends Point {
   at?: Symbol
}

export interface Hint {
   actions: Action[]
   highlights?: Array<
      Point & {
         highlightedCandidates?: Symbol[]
      }
   >
   blocked?: Point[]
   highlightCols?: number[]
   highlightRows?: number[]
   highlightNinths?: number[]
   connections?: ExactPoint[][]
}

export type Action = Point & {
   value: Symbol
   type: 'value' | 'exclude'
}

/**
 * @param y the y position of the cell to modify
 * @param x the x position of the cell to modify
 * @param cell The values to overwrite at that cell
 * @returns A function creating a new sudoku with the modified cell
 */
export function modifySudoku(y: number, x: number, cell: SetStateAction<Partial<Cell>>): (s: Sudoku) => Sudoku {
   return s => ({
      ...s,
      cells: s.cells.map((row, r) =>
         row.map((ce, c) => {
            if (y === r && x === c) {
               const unchecked = { ...ce, ...(typeof cell === 'function' ? cell(ce) : cell) }
               return { ...unchecked, candidates: unchecked.value ? [] : unchecked.candidates }
            } else return ce
         })
      ),
   })
}
/**
 * @param point The point
 * @returns an integer representing the ninth at this point of the sudoku
 */
export function ninthAt(point: Point) {
   const ninthY = Math.floor(point.row / 3)
   const ninthX = Math.floor(point.col / 3)
   return ninthY + ninthX * 3
}

/**
 * Maps a 2-dimensional cell array to a flat array, saving the row and column in the cell object
 * @param cells The 2-dimensional array
 * @returns An array of cells with points
 */
export function withPoints(cells: Cell[][]): CellWithPoint[] {
   return cells.map((a, row) => a.map((cell, col) => ({ ...cell, col, row }))).flat()
}

/**
 * @param points an array of points
 * @returns If all the points are in the same group as the first one
 */
export const inGroup = (...points: Point[]) => {
   if (points.length === 0) return true
   return sharedGroups(...points).length > 0
}

export const sharedGroups = (...[first, ...points]: Point[]) => {
   if (points.length === 0) return []
   const { row, col } = first
   const ninth = ninthAt(first)
   const sources = []
   if (points.every(p => p.col === col)) sources.push('col')
   if (points.every(p => p.row === row)) sources.push('row')
   if (points.every(p => ninthAt(p) === ninth)) sources.push('ninth')
   return sources as Array<'col' | 'row' | 'ninth'>
}

export const inRow = (row: number, s: Sudoku) => withPoints(s.cells).filter(c => c.row === row) ?? []
export const inCol = (col: number, s: Sudoku) => withPoints(s.cells).filter(c => c.col === col) ?? []
export const inNinth = (point: Point | number, s: Sudoku) => withPoints(s.cells).filter(c => ninthAt(c) === (typeof point === 'number' ? point : ninthAt(point)))

export interface CellWithPoint extends Cell, Point {}

export interface Blocker extends CellWithPoint {
   source: Array<'col' | 'row' | 'ninth'>
}

/**
 * Find's all cells which are `blockers` of all the given points
 * Blockers are cells that share at least one group
 *
 * @param s The sudoku
 * @param points The points to check
 * @returns all cells in the same group as all of the given points, containing information about which groups they share
 */
export function possibleBlockers(s: Sudoku, ...points: Point[]): Blocker[] {
   const { col, row } = points[0]
   const ninth = ninthAt(points[0])

   const c = points.every(p => p.col === col) ? inCol(col, s) : []
   const r = points.every(p => p.row === row) ? inRow(row, s) : []
   const n = points.every(p => ninthAt(p) === ninth) ? inNinth(points[0], s) : []
   const e = withPoints(s.cells).filter(it => points.every(p => inGroup(p, it)))

   const all = [c, r, n, e].flat() as Blocker[]
   return all
      .filter(uniqByPoint)
      .filter(c => points.every(p => c.col !== p.col || c.row !== p.row))
      .map(b => {
         const source: Blocker['source'] = []
         if (c.includes(b)) source.push('col')
         if (r.includes(b)) source.push('row')
         if (n.includes(b)) source.push('ninth')
         return { ...b, source }
      })
}

export function uniqByPoint(c1: CellWithPoint, i1: number, a: CellWithPoint[]) {
   return !a.some((c2, i2) => i2 < i1 && c1.col === c2.col && c1.row === c2.row)
}

/**
 * @param point The point of the cell
 * @param sudoku The sudoku
 * @returns All values that could be placed in this cell
 */
export function possibleValues(point: Point, sudoku: Sudoku) {
   const takenValues = possibleBlockers(sudoku, point).filter(c => !!c.value)
   const possibleValues = numSymbols.filter(i => !takenValues.some(c => c.value === i))
   return possibleValues
}

/**
 *
 * @param point The point of the cell
 * @param value The value to test
 * @param sudoku The sudoku
 * @returns If the value can be placed in the given cell
 */
export function canPut(point: Point, value: Symbol, sudoku: Sudoku, ignoreThis = false) {
   if (!ignoreThis && !!sudoku.cells[point.row][point.col].value) return false
   if (possibleBlockers(sudoku, point).some(c => c.value === value)) return false
   return true
}

/**
 * @param point The point of the cell
 * @param value The value to test
 * @param sudoku The sudoku
 * @returns All blockers of the cell that contain this value
 */
export function blockedBy(point: Point, value: Symbol, sudoku: Sudoku): Blocker[] {
   if (!!sudoku.cells[point.row][point.col].value) return []
   return possibleBlockers(sudoku, point).filter(c => c.value === value)
}

export function connectionsOf(chain: Point[]) {
   return chain.slice(1).map((a, i) => [a, chain[i]])
}
