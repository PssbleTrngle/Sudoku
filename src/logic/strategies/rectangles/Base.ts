import { exists } from "../../../util";
import { CellWithPoint, ninthAt } from "../../Sudoku";
import Strategy from "../Strategy";

export interface Rectangle {
   corners: CellWithPoint[]
   candidates: number[]
}

export default abstract class ForbiddenRectangle extends Strategy {

   /**
    * Finds rectangle which fit all the conditions a of the forbidden rectangle strategies
    * @returns The for corner cells and the candidate pair they share
    */
   getRectangles(): Rectangle[] {

      return this.cells().map(origin => {

         // Possible pairs of candidates this cell contains ([1,2], [1,3]  ... [3,2] ...)
         const pairs = origin.candidates.map(a => origin.candidates.filter(b => a < b).map(b => [a, b])).flat()

         return pairs.map(pair => {

            // All cells that contain both these candidates
            const withPair = this.find(({ candidates }) => pair.every(i => candidates.includes(i)))

            // Search for cells in the same column with these candidates
            return withPair.filter(({ point }) => origin.point.col === point.col && origin.point.row < point.row).map(inCol => {

               // Search for cells in the same row with these candidates
               return withPair.filter(({ point }) => origin.point.row === point.row && origin.point.col < point.col).map(inRow => {

                  // The point & cell which would complete a rectangle made up of the point in the column, in the row and the origin point
                  // and check if this `across` cell also contains both candidates
                  const acrossPoint = { row: inCol.point.row, col: inRow.point.col }
                  const across: CellWithPoint = { point: acrossPoint, ...this.sudoku.cells[acrossPoint.row][acrossPoint.col] }
                  if (pair.some(i => !across.candidates.includes(i))) return null

                  // The corners of the rectangle
                  const corners = [origin, inCol, inRow, across]

                  // Check if all corners are in one of two ninths
                  const ninths = corners.map(c => ninthAt(c.point)).filter((n1, i1, a) => !a.some((n2, i2) => i2 < i1 && n1 === n2))
                  if (ninths.length !== 2) return null

                  // If there are less than two corners with exactly two candidates, which are part of the same group, return
                  const withTwo = corners
                     .filter(c => c.candidates.length === 2)
                     .filter((c1, i1, a) => a.some((c2, i2) => i1 !== i2 && (
                        c1.point.row === c2.point.row || c1.point.col === c2.point.row || ninthAt(c1.point) === ninthAt(c2.point)
                     )))
                  if (withTwo.length < 2) return null

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
