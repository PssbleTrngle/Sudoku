import { arrayEqual, exists } from "../../../util";
import { CellWithPoint, Hint } from "../../Sudoku";
import ForbiddenRectangle from './Base';

export interface Rectangle {
   corners: CellWithPoint[]
   candidates: number[]
}

export default class ForbiddenRectangle1 extends ForbiddenRectangle {

   getName() {
      return 'Verbotenes Rechteck Typ 1'
   }

   getHints() {

      return this.getRectangles().map<Hint | null>(({ corners, candidates }) => {

         const withAdditional = corners.filter(c => !arrayEqual(candidates, c.candidates))

         if (withAdditional.length !== 1) return null;

         return {
            actions: candidates.map(value => ({
               ...withAdditional[0].point,
               type: 'exclude', value,
            })),
            highlights: corners.map(c => ({ ...c.point, candidates })),
         }

      }).filter(exists)

   }

}
