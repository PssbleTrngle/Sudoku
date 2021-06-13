import { define } from '.'
import WWing from '../strategies/WWing'

define('W-Wing', [
   [1, 2, [4, 8], 5, 7, 9, [3, 4], [3, 6, 8], [4, 6, 8]],
   [[6, 8], 3, 9, 2, 4, [1, 6], 5, [1, 6, 8], 7],
   [5, [4, 6], 7, [1, 6], 3, 8, 9, 2, [1, 4, 6]],
   [[2, 4, 8, 9], [1, 4, 8], 6, 7, [1, 2, 5, 8, 9], [1, 2, 5], [3, 4], [1, 3, 5, 8], [1, 4, 8]],
   [[4, 8, 9], 7, 3, [1, 6, 8], [1, 5, 6, 8, 9], [1, 5, 6], 2, [1, 5, 6, 8], [1, 4, 6, 8]],
   [[2, 8], 5, [1, 2, 8], 3, [6, 8], 4, 7, [1, 6, 8], 9],
   [7, [1, 4, 6], [1, 2, 4], [1, 4, 6], [1, 2, 5, 6], [1, 2, 5, 6], 8, 9, 3],
   [[2, 6, 8], 9, [2, 4, 8], [4, 8], [2, 6, 8], 3, 1, 7, 5],
   [3, [1, 8], 5, 9, [1, 8], 7, 6, 4, 2],
], WWing, 'Um diese Strategie anzuwenden, müssen Sie nach zwei identischen Kandidatenpaaren auf dem Sudoku Feld suchen. Diese dürfen nicht in einer Reihe liegen. In unserem Beispiel haben wir Ihnen solche Felder mit einer 6 und einer 8 umrandet. Als nächstes benötigen wir eine Reihe, die einen dieser Kandidaten genau zweimal enthält, und zwar auf höhe der beiden anderen Felder. Dies ist in Zeile 8 mit der 6 der Fall. Diese Konstellation bewirkt, dass im Schnittpunkt der beiden anderen Felder der andere Kandidatenwert gestrichen werden kann. Im Beispiel Sudoku wurde daher die 8 rot markiert.')
