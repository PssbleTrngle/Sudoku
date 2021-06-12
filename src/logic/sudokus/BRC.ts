import { define } from '.'
import BRC from '../strategies/BRC'

define('BRC', [
   [0, 0, 0, 9, 2, 3, 1, 0, 0],
   [5, 0, 7, 0, 0, 0, 0, 8, 0],
   [2, 0, 1, 0, 8, 0, 0, 0, 0],
   [0, 4, 0, 0, 0, 0, 6, 0, 0],
   [0, 0, 0, 0, 5, 0, 0, 2, 0],
   [0, 1, 0, 0, 0, 0, 0, 0, 0],
   [8, 0, 0, 0, 7, 0, 0, 0, 0],
   [0, 0, 0, 6, 0, 0, 4, 0, 0],
   [0, 0, 0, 3, 0, 0, 0, 0, 9],
], BRC, 'Um einen Block-Reihe-Chreck anzuwenden, suchen Sie nach einem Kandidatenwert, der innerhalb eines Blocks nur in einer Reihe (Zeile oder Spalte) vorkommt. In unserem Beispiel ist dies in der fünften Zeile, im linken Block der Fall. Dort können Sie sehen, dass die 8 innerhalb dieses Blocks nur in der fünften Zeile vorkommt. Weil dies die einzigen beiden 8er in diesem Block sind, muss einer davon der richtige sein. Daher sind alle weiteren 8er Kandidaten in dieser Zeile definitiv falsch und können gestrichen werden. In unserem Beispiel haben wir ihnen dies durch ein rotes Markieren der 8er Kandidaten kenntlich gemacht.')

define('BRC 2', [
   [4, [3, 5, 7, 8, 9], [3, 5, 7, 8], [2, 7, 9], [1, 2, 7, 9], [2, 3, 7], [1, 3, 5, 8], [2, 3, 8], 6],
   [2, [3, 6, 9], [3, 6], 8, 5, [3, 6], 4, 7, [1]],
   [[3, 6, 7], [3, 5, 6, 7, 8], 1, [2, 6, 7], [2, 6, 7], 4, 9, [2, 3, 8], [2, 5]],
   [[1, 3, 6, 7, 9], [1, 3, 5, 6, 7, 8, 9], [3, 5, 6, 7, 8], 4, [2, 6, 7], [2, 6, 7, 8], [3, 5, 7, 8], [3, 6, 8, 9], [5, 7, 9]],
   [[3, 6, 7, 9], 2, 4, 1, [6, 7], [6, 7, 8], [3, 5, 7, 8], [3, 6, 8, 9], [5, 7, 9]],
   [[6, 7], [6, 7, 8], [6, 7, 8], 5, 3, 9, 2, 1, 4],
   [5, [3, 4, 6, 7], [2, 3, 6, 7], [2, 6, 7, 9], 8, 1, [7], [2, 4, 9], [2, 7, 9]],
   [[1, 7], [1, 4, 7], [2, 7], 3, [2, 4, 7, 9], 5, 6, [2, 4, 9], 8],
   [8, [1, 4, 6, 7], 9, [2, 6, 7], [2, 4, 6, 7], [2, 6, 7], [1, 7], 5, 3]
], BRC)
