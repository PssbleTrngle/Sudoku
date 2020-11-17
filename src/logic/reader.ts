import { Sudoku } from './Sudoku'

export async function read(name: string) {
    const json = require(`../assets/sudokus/${name}.json`)
    return parse(json)
}

function isValid(json: any): json is (number | null)[][] {
    return Array.isArray(json) && json.length === 9
        && json.every(a => Array.isArray(a) && a.length === 9
            && a.every(n => n === null || typeof n === 'number'))
}

function parse(json: any): Sudoku {
    const valid = isValid(json)

    if (!valid) throw new Error('Not a valid sudoku')
    const cells = (json as number[][]).map(r => r.map(n => ({
        value: (n === 0 ? undefined : n) ?? undefined,
        possibles: [],
    })));

    return { cells }
}