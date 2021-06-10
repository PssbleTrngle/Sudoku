import { cross, exists } from "../../util";
import { CellWithPoint, Hint, possibleBlockers, sharedGroups } from "../Sudoku";
import ChainStrategy from "./ChainStrategy";

export default class XChain extends ChainStrategy {

    getName() {
        return 'X-Kette'
    }

    getHints() {

        const i = 3

        const predicate = (it: CellWithPoint) => {
            if (!it.candidates.includes(i)) return false
            const blockers = possibleBlockers(this.sudoku, it.point)
            return ['col', 'row', 'ninth'].some(s =>
                blockers.filter(b => b.source.includes(s as any) && b.candidates.includes(i)).length === 1
            )
        }

        const cells = this.find(predicate)

        const chains = this.getChains(
            predicate,
            (a, b) => {
                if ([a, b].some(it => !it.candidates.includes(i))) return false
                const points = [a, b].map(it => it.point)
                const shared = sharedGroups(...points)
                if (shared.length === 0) return false
                const blockers = possibleBlockers(this.sudoku, ...points)
                return shared.some(s =>
                    blockers.filter(b => b.source.includes(s) && b.candidates.includes(i)).length === 0
                )
            },
            cells,
        )

        return chains.map(({ chains }) =>
            chains.filter(C => C.length > 4).map<Hint>(chain => {

                const connections = chain.slice(1).map((a, i) => [a.point, chain[i].point])

                const eitherOrs = cross(
                    chain.filter((_, i) => i % 2 === 0),
                    chain.filter((_, i) => i % 2 === 1),
                )

                const blockers = eitherOrs.map(c =>
                    possibleBlockers(this.sudoku, ...c.map(it => it.point))
                        .filter(it => it.candidates.includes(i))
                        .map(b => ({ ...b, by: c }))
                ).flat().filter(b => !chain.some(it => it.point.col === b.point.col && it.point.row === b.point.row))

                return {
                    actions: blockers.map(c => ({
                        ...c.point,
                        value: i,
                        type: 'exclude',
                    })),
                    connections,
                    highlights: chain.map(c => ({ ...c.point, candidates: [i] })),
                }
            })

        ).flat().filter(exists)

    }

}