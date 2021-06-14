import { cross, crossDiff } from '../../util'
import { CellWithPoint } from '../Sudoku'
import Naked from './Naked'

export default class NakedTriple extends Naked {
   getName() {
      return 'Nackter Dreier'
   }

   cross(symbols: CellWithPoint[]) {
      return crossDiff(symbols, cross(symbols)).map(([a, b]) => [a, ...b])
   }

   count() {
      return 3
   }
}
