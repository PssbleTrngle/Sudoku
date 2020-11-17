

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
}