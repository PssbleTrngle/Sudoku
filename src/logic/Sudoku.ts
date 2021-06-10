import { SetStateAction } from "react"
import { arrayOf } from "../util"


export interface Cell {
    value?: number;
    candidates: number[];
}

export type Sudoku = {
    cells: Cell[][]
}

export interface Point {
    col: number;
    row: number
}

export interface Hint {
    actions: Action[]
    highlights?: Array<Point & {
        candidates?: number[]
    }>
    blocked?: Point[]
    highlightCols?: number[]
    highlightRows?: number[]
    highlightNinths?: number[]
}

export type Action = Point & {
    value: number
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
        ...s, cells: s.cells.map((row, r) => row.map((ce, c) => {
            if (y === r && x === c) {
                const unchecked = { ...ce, ...(typeof cell === 'function' ? cell(ce) : cell) }
                return { ...unchecked, candidates: unchecked.value ? [] : unchecked.candidates }
            }
            else return ce
        }))
    })
}
/**
 * @param point The point
 * @returns an integer representing the ninth at this point of the sudoku 
 */
export function ninthAt(point: Point) {
    const ninthY = Math.floor(point.row / 3)
    const ninthX = Math.floor(point.col / 3)
    return ninthY + (ninthX * 3)
}

/**
 * Maps a 2-dimensional cell array to a flat array, saving the row and column in the cell object
 * @param cells The 2-dimensional array
 * @returns An array of cells with points
 */
export function withPoints(cells: Cell[][]): CellWithPoint[] {
    return cells.map((a, row) => a.map((cell, col) => ({ ...cell, point: { col, row } }))).flat()
}

/**
 * @param points an array of points
 * @returns If all the points are in the same group as the first one
 */
export const inGroup = (...[first, ...points]: Point[]) => {
    if (points.length === 0) return true
    const { row, col } = first
    const ninth = ninthAt(first)
    return points.every(p => p.col === col || p.row === row || ninthAt(p) === ninth)
}

export const inRow = (row: number, s: Sudoku) => withPoints(s.cells).filter(c => c.point.row === row) ?? []
export const inCol = (col: number, s: Sudoku) => withPoints(s.cells).filter(c => c.point.col === col) ?? []
export const inNinth = (point: Point, s: Sudoku) => withPoints(s.cells).filter(c => ninthAt(c.point) === ninthAt(point))

export interface CellWithPoint extends Cell {
    point: Point
}

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

    const all = [c, r, n].flat() as Blocker[]
    return all.filter(uniqByPoint)
        .filter(c => points.every(p => c.point.col !== p.col || c.point.row !== p.row))
        .map(b => {
            const source: Blocker['source'] = []
            if (c.includes(b)) source.push('col')
            if (r.includes(b)) source.push('row')
            if (n.includes(b)) source.push('ninth')
            return { ...b, source }
        })
}

export function uniqByPoint(c1: CellWithPoint, i1: number, a: CellWithPoint[]) {
    return !a.some((c2, i2) => i2 < i1 && c1.point.col === c2.point.col && c1.point.row === c2.point.row)
}

/**
 * @param point The point of the cell
 * @param sudoku The sudoku
 * @returns All values that could be placed in this cell
 */
export function possibleValues(point: Point, sudoku: Sudoku) {
    const takenValues = possibleBlockers(sudoku, point).filter(c => !!c.value)
    const possibleValues = arrayOf(9).filter(i => !takenValues.some(c => c.value === i))
    return possibleValues
}

/**
 * 
 * @param point The point of the cell
 * @param value The value to test
 * @param sudoku The sudoku
 * @returns If the value can be placed in the given cell
 */
export function canPut(point: Point, value: number, sudoku: Sudoku) {
    if (!!sudoku.cells[point.row][point.col].value) return false;
    if (possibleBlockers(sudoku, point).some(c => c.value === value)) return false;
    return true;
}

/**
 * @param point The point of the cell
 * @param value The value to test
 * @param sudoku The sudoku
 * @returns All blockers of the cell that contain this value
 */
export function blockedBy(point: Point, value: number, sudoku: Sudoku): Blocker[] {
    if (!!sudoku.cells[point.row][point.col].value) return [];
    return possibleBlockers(sudoku, point).filter(c => c.value === value)

}