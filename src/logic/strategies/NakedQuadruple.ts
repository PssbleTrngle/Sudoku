import { cross, crossDiff } from '../../util'
import { CellWithPoint } from '../Sudoku'
import Naked from './Naked'

export default class NakedQuadruple extends Naked {
   getName() {
      return 'Nackter Vierer'
   }

   cross(symbols: CellWithPoint[]) {
      return crossDiff(
         symbols,
         crossDiff(symbols, cross(symbols)).map(([a, b]) => [a, ...b])
      ).map(([a, b]) => [a, ...b])
   }

   count() {
      return 4
   }
}
