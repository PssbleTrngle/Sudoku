import { Cell, Sudoku } from './Sudoku';

export async function read(name: string) {
    const json = require(`../assets/sudokus/${name}.json`)
    return parse(json)
}

function parse(json: any): Sudoku {
    const cells: Cell[][] = (json as unknown[][]).map(r => r.map(n => {

        if (typeof n === 'number') return {
            value: (n === 0 ? undefined : n) ?? undefined,
            possibles: [],
        }

        else if (Array.isArray(n)) return {
            value: undefined,
            possibles: n,
        }

        else if (typeof n === 'object') return n as Cell

        else throw new Error('Not a valid sudoku')

    }));

    return { cells }
}