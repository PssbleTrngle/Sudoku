import { exists } from "../../../util";
import { CellWithPoint, ninthAt } from "../../Sudoku";
import Strategy from "../Strategy";

export interface Rectangle {
   corners: CellWithPoint[]
   candidates: number[]
}

export default abstract class ForbiddenRectangle extends Strategy {

   getRectangles(): Rectangle[] {

      return this.cells().map(origin => {

         const pairs = origin.candidates.map(a => origin.candidates.filter(b => a < b).map(b => [a, b])).flat()

         return pairs.map(pair => {

            const withPair = this.find(({ candidates }) => pair.every(i => candidates.includes(i)))

            return withPair.filter(({ point }) => origin.point.col === point.col && origin.point.row < point.row).map(inCol => {

               return withPair.filter(({ point }) => origin.point.row === point.row && origin.point.col < point.col).map(inRow => {

                  const acrossPoint = { row: inCol.point.row, col: inRow.point.col }
                  const across: CellWithPoint = { point: acrossPoint, ...this.sudoku.cells[acrossPoint.row][acrossPoint.col] }
                  const corners = [origin, inCol, inRow, across]

                  if (pair.some(i => !across.candidates.includes(i))) return null

                  const ninths = corners.map(c => ninthAt(c.point)).filter((n1, i1, a) => !a.some((n2, i2) => i2 < i1 && n1 === n2))
                  if (ninths.length !== 2) return null

                  if (corners.filter(c => c.candidates.length === 2).length < 2) return null

                  return {
                     corners,
                     candidates: pair
                  }

               })

            })

         })

      }).flat(3).filter(exists)

   }

}
