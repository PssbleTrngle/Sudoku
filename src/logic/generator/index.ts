import { arrayOf } from "../../util";
import { canPut, modifySudoku, Sudoku } from "../Sudoku";
import History from './History';

const NUMS = arrayOf(9)

function createEmpty(): Sudoku {
    const cells = NUMS.map(() => NUMS.map(() => ({
        possibles: []
    })))
    return { cells }
}

export default function generate() {

    const builder = new History(createEmpty())

    // Fill with number 1-9
    NUMS.forEach(value => {

        // For each ninth of the sudoku
        NUMS.map(i => i - 1).forEach(i => {

            builder.step(async s => {

                const [ninthX, ninthY] = [i % 3, Math.floor(i / 3)].map(i => i * 3)
                const randomziedFields = NUMS.map(i => i - 1)
                    .map(i => [i % 3 + ninthX, Math.floor(i / 3) + ninthY])
                    .map(xy => xy as [number, number])
                    .sort(() => Math.random() - 0.5)

                const possible = randomziedFields.find(([x, y]) => canPut(x, y, value, builder.current))
                if (possible) return modifySudoku(...possible, { value })(s)
                else throw new Error()

            })

        })
    })

    return builder.execute()
}