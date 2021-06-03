import { exists } from "../../util";
import { Hint, possibleBlockers } from "../Sudoku";
import Strategy from "./Strategy";

export default class ThirdEye extends Strategy {

    getName() {
        return 'Drittes Auge'
    }

    getHints() {

        const empty = this.find(c => !c.value)

        const [withMore, ...rest] = empty.filter(c => c.candidates.length > 2)

        if (!withMore || rest.length > 0) return []

        const blockers = possibleBlockers(this.sudoku, withMore.point)

        const hit = withMore.candidates.map(c => {

            const otherPossibilities = blockers.filter(b => b.candidates.includes(c))
            const matches = otherPossibilities.map(p => p.source).flat().reduce((o, source) => ({
                ...o, [source]: (o[source] ?? 0) + 1
            }), {} as Record<string, number>)

            const [source] = Object.entries(matches).find(([, amount]) => amount > 1) ?? []
            if (!source) return null
            return {
                blockers: otherPossibilities.filter(p => p.source.includes(source as any)),
                candidate: c,
            }

        }).filter(exists)

        if (hit.length !== 1) return []
        const remove = withMore.candidates.filter(c => c !== hit[0].candidate)

        const hint: Hint = {
            highlights: [withMore.point, ...hit[0].blockers.map(b => ({
                ...b.point,
                candidates: [hit[0].candidate],
            }))],
            actions: remove.map(value => ({
                ...withMore.point,
                type: 'exclude',
                value,
            })),
        }

        return [hint]
    }

}