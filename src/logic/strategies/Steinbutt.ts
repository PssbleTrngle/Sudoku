import { arrayEqual, arrayOf, exists } from "../../util";
import { connectionsOf, Hint, inNinth, inRow, ninthAt, sharedGroups, symbols } from "../Sudoku";
import Strategy from "./Strategy";

export default class Steinbutt extends Strategy {

    getName() {
        return 'Steinbutt'
    }

    getHints() {

        const rows = arrayOf(9).map(i => i - 1)

        return symbols.map(candidate => {

            return rows.map(row => {

                const pair = inRow(row, this.sudoku).filter(it => it.candidates.includes(candidate))
                const pairPoints = pair.map(it => it.point)
                if (pair.length !== 2 || ninthAt(pairPoints[0]) === ninthAt(pairPoints[1])) return []

                return pair.map(direct => {
                    const indirect = pair.find((_, i) => i !== pair.indexOf(direct))!

                    const inCol = this.find(it => it.point.col === direct.point.col && it.point.row !== row && it.candidates.includes(candidate))

                    return inCol.map<Hint | null>(removed => {

                        const attackingNinth = ninthAt({ row: removed.point.row, col: indirect.point.col })
                        const snipers = inNinth(attackingNinth, this.sudoku).filter(it => it.candidates.includes(candidate))

                        if (snipers.length !== 2) return null
                        if (!arrayEqual(sharedGroups(...snipers.map(it => it.point)), ['ninth'])) return null

                        const sniperA = snipers.find(it => it.point.row === removed.point.row)
                        const sniperB = snipers.find(it => it.point.col === indirect.point.col)
                        if (!sniperA || !sniperB) return null

                        const points = [direct, removed, sniperA, sniperB, indirect].map(it => ({ ...it.point, candidates: [candidate] }))

                        return {
                            actions: [{
                                ...removed.point,
                                value: candidate,
                                type: 'exclude',
                            }],
                            highlights: points,
                            highlightRows: [row],
                            connections: connectionsOf(points),
                        }

                    })

                })

            })

        }).flat(3).filter(exists)

    }

}