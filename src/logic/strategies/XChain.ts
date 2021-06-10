import { arrayOf, cross, exists } from "../../util";
import { CellWithPoint, Hint, possibleBlockers, sharedGroups } from "../Sudoku";
import ChainStrategy from "./ChainStrategy";

export default class XChain extends ChainStrategy {

    getName() {
        return 'X-Kette'
    }

    getHints() {

        return arrayOf(9).map(candidate => {

            const predicate = (it: CellWithPoint) => {
                if (!it.candidates.includes(candidate)) return false
                const blockers = possibleBlockers(this.sudoku, it.point)
                return ['col', 'row', 'ninth'].some(s =>
                    blockers.filter(b => b.source.includes(s as any) && b.candidates.includes(candidate)).length === 1
                )
            }

            const cells = this.find(predicate)

            const chains = this.getChains(
                predicate,
                (a, b) => {
                    if ([a, b].some(it => !it.candidates.includes(candidate))) return false
                    const points = [a, b].map(it => it.point)
                    const shared = sharedGroups(...points)
                    if (shared.length === 0) return false
                    const blockers = possibleBlockers(this.sudoku, ...points)
                    return shared.some(s =>
                        blockers.filter(b => b.source.includes(s) && b.candidates.includes(candidate)).length === 0
                    )
                },
                cells,
            )

            return chains.map(({ chains }) =>
                chains.filter(C => C.length > 4).map<Hint>(chain => {

                    const connections = chain.slice(1).map((a, i) => [a, chain[i]].map(it => ({ ...it.point })))

                    const eitherOrs = cross(
                        chain.filter((_, i) => i % 2 === 0),
                        chain.filter((_, i) => i % 2 === 1),
                    )

                    const blockers = eitherOrs.map(c =>
                        possibleBlockers(this.sudoku, ...c.map(it => it.point))
                            .filter(it => it.candidates.includes(candidate))
                            .map(b => ({ ...b, by: c }))
                    ).flat().filter(b => !chain.some(it => it.point.col === b.point.col && it.point.row === b.point.row))

                    return {
                        actions: blockers.map(c => ({
                            ...c.point,
                            value: candidate,
                            type: 'exclude',
                        })),
                        connections,
                        highlights: chain.map(c => ({ ...c.point, candidates: [candidate] })),
                    }
                })
            )
        }).flat(2).filter(exists)

    }

}