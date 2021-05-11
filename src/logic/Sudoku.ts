import { arrayOf } from "../util"


export interface Cell {
    value?: number;
    candidates: number[];
}

export type Sudoku = {
    cells: Cell[][]
}

interface Point {
    col: number;
    row: number
}

export interface Hint extends Point {
    value: number;
    type: 'value' | 'exclude',
    highlights?: Point[]
    blocked?: Point[]
    highlightCols?: number[]
    highlightRows?: number[]
    highlightNinths?: number[]
}

export function modifySudoku(y: number, x: number, cell: Partial<Cell>): (s: Sudoku) => Sudoku {
    return s => ({
        ...s, cells: s.cells.map((row, r) => row.map((ce, c) => {
            if (y === r && x === c) return { ...ce, ...cell }
            else return ce
        }))
    })
}

export function ninthAt(point: Point) {
    const ninthY = Math.floor(point.row / 3)
    const ninthX = Math.floor(point.col / 3)
    return ninthY + (ninthX * 3)
}

export function withPoints(cells: Cell[][]): CellWithPoint[] {
    return cells.map((a, row) => a.map((cell, col) => ({ ...cell, point: { col, row } }))).flat()
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

export function possibleValues(point: Point, sudoku: Sudoku) {
    const takenValues = possibleBlockers(sudoku, point).filter(c => !!c.value)
    const possibleValues = arrayOf(9).filter(i => !takenValues.some(c => c.value === i))
    return possibleValues
}

export function canPut(point: Point, value: number, s: Sudoku) {
    if (!!s.cells[point.row][point.col].value) return false;
    if (possibleBlockers(s, point).some(c => c.value === value)) return false;
    return true;
}

export function blockedBy(point: Point, value: number, s: Sudoku): Blocker[] {
    if (!!s.cells[point.row][point.col].value) return [];
    return possibleBlockers(s, point).filter(c => c.value === value)

}