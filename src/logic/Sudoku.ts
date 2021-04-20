

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
    highlightRows?: number[]
    highlightCols?: number[]
    highlightNinths?: number[]
}

export function modifySudoku(x: number, y: number, cell: Partial<Cell>): (s: Sudoku) => Sudoku {
    return s => ({
        ...s, cells: s.cells.map((row, r) => row.map((ce, c) => {
            if (x === r && y === c) return { ...ce, ...cell }
            else return ce
        }))
    })
}

export function ninthAt(x: number, y: number) {
    const ninthX = Math.floor(x / 3)
    const ninthY = Math.floor(y / 3)
    return ninthX + (ninthY * 3)
}

export function withPoints(cells: Cell[][]) {
    return cells.map((col, x) => col.map((cell, y) => ({ ...cell, point: { x, y } }))).flat()
}

export const inRow = (y: number, s: Sudoku) => withPoints(s.cells).filter(c => c.point.y === y) ?? []
export const inCol = (x: number, s: Sudoku) => withPoints(s.cells).filter(c => c.point.x === x) ?? []
export const inNinth = (x: number, y: number, s: Sudoku) => withPoints(s.cells)
    .filter(c => ninthAt(c.point.x, c.point.y) === ninthAt(x, y))

function possibleBlockers(x: number, y: number, s: Sudoku) {
    const col = inCol(x, s).map(c => ({ ...c, source: 'col' }))
    const row = inRow(y, s).map(c => ({ ...c, source: 'row' }))
    const group = inNinth(x, y, s).map(c => ({ ...c, source: 'ninth' }))

    return [col, row, group].flat()
}

export function canPut(x: number, y: number, value: number, s: Sudoku) {
    if (!!s.cells[x][y].value) return false;

    if (possibleBlockers(x, y, s).some(c => c.value === value)) return false;

    return true;

}

export function blockedBy(x: number, y: number, value: number, s: Sudoku) {
    if (!!s.cells[x][y].value) return [];
    return possibleBlockers(x, y, s).filter(c => c.value === value)

}