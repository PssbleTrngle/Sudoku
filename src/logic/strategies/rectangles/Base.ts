import { cross, exists } from "../../../util";
import { CellWithPoint, ninthAt, Symbol } from "../../Sudoku";
import Strategy from "../Strategy";

export interface Rectangle {
   corners: CellWithPoint[]
   candidates: Symbol[]
}

export default abstract class ForbiddenRectangle extends Strategy {

   /**
    * Finds rectangle which fit all the conditions a of the forbidden rectangle strategies
    * @returns The for corner cells and the candidate pair they share
    */
   getRectangles(): Rectangle[] {

      return this.cells().map(origin => {

         // Possible pairs of candidates this cell contains ([1,2], [1,3]  ... [3,2] ...)
         const pairs = cross(origin.candidates)

         return pairs.map(pair => {

            // All cells that contain both these candidates
            const withPair = this.find(({ candidates }) => pair.every(i => candidates.includes(i)))

            // Search for cells in the same column with these candidates
            return withPair.filter(it => origin.col === it.col && origin.row < it.row).map(inCol => {

               // Search for cells in the same row with these candidates
               return withPair.filter(it => origin.row === it.row && origin.col < it.col).map(inRow => {

                  // The point & cell which would complete a rectangle made up of the point in the column, in the row and the origin point
                  // and check if this `across` cell also contains both candidates
                  const acrossPoint = { row: inCol.row, col: inRow.col }
                  const across: CellWithPoint = { ...acrossPoint, ...this.sudoku.cells[acrossPoint.row][acrossPoint.col] }
                  if (pair.some(i => !across.candidates.includes(i))) return null

                  // The corners of the rectangle
                  const corners = [origin, inCol, inRow, across]

                  // Check if all corners are in one of two ninths
                  const ninths = corners.map(c => ninthAt(c)).filter((n1, i1, a) => !a.some((n2, i2) => i2 < i1 && n1 === n2))
                  if (ninths.length < 2) return null

                  // If there are less than two corners with exactly two candidates, which are part of the same group, return
                  const withTwo = corners
                     .filter(c => c.candidates.length === 2)
                     .filter((c1, i1, a) => a.some((c2, i2) => i1 !== i2 && (
                        c1.row === c2.row || c1.col === c2.row || ninthAt(c1) === ninthAt(c2)
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
