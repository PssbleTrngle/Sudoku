import { arrayOf } from "../../util";
import { recursiveSolve } from "../solver";
import { canPut, modifySudoku, Sudoku, symbols, withPoints } from "../Sudoku";
import History from './History';

const NUMS = arrayOf(9)

export function createEmpty(): Sudoku {
    const cells = NUMS.map(() => NUMS.map(() => ({
        candidates: []
    })))
    return { cells }
}

export default function generate() {

    const builder = new History<Sudoku>()

    // Fill with number 1-9
    symbols.forEach(value => {

        builder.mark()

        // For each ninth of the sudoku
        NUMS.map(i => i - 1).forEach(i => {

            builder.step(async s => {

                const [ninthX, ninthY] = [i % 3, Math.floor(i / 3)].map(i => i * 3)
                const randomziedFields = NUMS.map(i => i - 1)
                    .map(i => [i % 3 + ninthX, Math.floor(i / 3) + ninthY])
                    .map(xy => xy as [number, number])
                    .sort(() => Math.random() - 0.5)

                const possible = randomziedFields.find(([col, row]) => canPut({ col, row }, value, builder.current))
                if (possible) return modifySudoku(...possible, { value })(s)
                else throw new Error()

            })

        })
    })

    const carver = new History<Sudoku>()

    carver.mark()
    arrayOf(81 - 34).forEach(i => {

        if (i % 8 === 0) carver.mark()

        carver.step(async s => {

            const [cell] = withPoints(s.cells).filter(c => !!c.value).sort(() => Math.random() - 0.5)

            if (cell) {
                const modified = modifySudoku(cell.col, cell.row, { value: undefined })(s)
                await recursiveSolve(modified)
                return modified
            }
            else throw new Error()

        })

    })

    return History.chain(createEmpty(), builder, carver)
}