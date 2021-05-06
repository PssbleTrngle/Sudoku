import { arrayOf } from "../util"


export interface Cell {
    value?: number;
    possibles: number[];
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

export function ninthAt(y: number, x: number) {
    const ninthY = Math.floor(y / 3)
    const ninthX = Math.floor(x / 3)
    return ninthY + (ninthX * 3)
}

export function withPoints(cells: Cell[][]) {
    return cells.map((col, x) => col.map((cell, y) => ({ ...cell, point: { x, y } }))).flat()
}

export const inRow = (y: number, s: Sudoku) => withPoints(s.cells).filter(c => c.point.y === y) ?? []
export const inCol = (x: number, s: Sudoku) => withPoints(s.cells).filter(c => c.point.x === x) ?? []
export const inNinth = (x: number, y: number, s: Sudoku) => withPoints(s.cells)
    .filter(c => ninthAt(c.point.x, c.point.y) === ninthAt(x, y))

interface CellWithPoint extends Cell {
    point: { x: number, y: number }
}

export interface Blocker extends CellWithPoint {
    source: Array<'col' | 'row' | 'ninth'>
}

export function possibleBlockers(row: number, col: number, s: Sudoku): Blocker[] {
    const c = inCol(row, s)
    const r = inRow(col, s)
    const group = inNinth(row, col, s)

    const all = [c, r, group].flat() as Blocker[]
    return all.filter(uniqByPoint).map(b => {
        const source: Blocker['source'] = []
        if (c.includes(b)) source.push('col')
        if (r.includes(b)) source.push('row')
        if (group.includes(b)) source.push('ninth')
        return { ...b, source }
    })
}

export function uniqByPoint(c1: CellWithPoint, i1: number, a: CellWithPoint[]) {
    return !a.some((c2, i2) => i2 < i1 && c1.point.x === c2.point.x && c1.point.y === c2.point.y)
}

export function possiblesValues(row: number, col: number, sudoku: Sudoku) {
    const takenValues = possibleBlockers(row, col, sudoku).filter(c => !!c.value)
    const possibleValues = arrayOf(9).filter(i => !takenValues.some(c => c.value === i))
    return possibleValues
}

export function canPut(x: number, y: number, value: number, s: Sudoku) {
    if (!!s.cells[x][y].value) return false;

    if (possibleBlockers(x, y, s).some(c => c.value === value)) return false;

    return true;

}

export function blockedBy(x: number, y: number, value: number, s: Sudoku): Blocker[] {
    if (!!s.cells[x][y].value) return [];
    return possibleBlockers(x, y, s).filter(c => c.value === value)

}