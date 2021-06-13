import { define } from '.'
import NakedSingle from '../strategies/NakedSingle'

define('Nackter Single', [
   [[8], 5, [4, 7], [4, 7], 6, 3, [1, 2, 7, 8], 9, [1, 2, 7, 8]],
   [1, [3, 4, 6, 7, 8, 9], [3, 4, 6, 7], [4, 7, 9], 2, 5, [7, 8], [3, 6, 7, 8], [3, 6, 7, 8]],
   [[3, 6], [3, 6, 7, 9], 2, [7, 9], 1, 8, [5, 7], 4, [3, 5, 6, 7]],
   [[3, 5, 6, 8], [1, 3, 6, 8], [3, 6], [1, 3, 4, 8, 9], 7, [1, 4, 9], [1, 5, 8, 9], 2, [1, 4, 5, 8, 9]],
   [[3, 5, 8], [1, 3, 7, 8], 9, 2, [3, 4, 8], [1, 4], 6, [1, 5, 7, 8], [1, 4, 5, 7, 8]],
   [4, 2, [7], 6, 5, [1, 9], 3, [1, 7, 8], [1, 7, 8, 9]],
   [2, [3], 5, [1, 3, 8, 9], [3, 8, 9], 6, 4, [1, 3, 7, 8], [1, 3, 7, 8, 9]],
   [9, [3, 4, 6], 1, [3, 4, 5, 8], [3, 4, 8], 7, [2, 5, 8], [3, 5, 6, 8], [2, 3, 5, 6, 8]],
   [7, [3, 4, 6], 8, [1, 3, 4, 5, 9], [3, 4, 9], 2, [1, 5, 9], [1, 3, 5, 6], [1, 3, 5, 6, 9]]
], NakedSingle, 'Ein nackter Single liegt vor, wenn in ein Feld nur noch eine Zahl eingetragen werden kann, da es im Einflussbereich von acht Zahlen liegt. Um einen nackten Single zu ermitteln, müssen Sie die freien Felder einzeln untersuchen. Suchen Sie nach einem freien Feld, in dessen Zeile, Spalte und Block insgesamt 8 verschiedene Zahlenwerte vorkommen. In unserem Beispiel ist dies im ersten Feld der ersten Zeile der Fall. Wie Sie durch die blauen Umrandungen nachverfolgen können, finden Sie im Einflussbereich unseres Feldes alle Zahlenwerte außer der 8. Dies ist der fehlende Zahlenwert und Sie können diesen in das Feld eintragen. In unserem Beispiel haben wir Ihnen das mit einer grünen 8 dargestellt. ')

define('Naked Single 2', [
   [0, 4, 0, 0, 8, 0, 3, 0, 0],
   [0, 7, 0, 0, 9, 0, 0, 0, 0],
   [0, 0, 2, 0, 0, 0, 0, 1, 8],
   [8, 0, 0, 9, 5, 0, 0, 0, 0],
   [0, 3, 0, 0, 0, 7, 0, 5, 4],
   [0, 4, 0, 0, 0, 6, 9, 0, 0],
   [0, 0, 0, 0, 0, 5, 0, 0, 0],
   [0, 0, 0, 0, 1, 0, 5, 3, 6],
   [0, 0, 0, 7, 0, 0, 0, 2, 0],
], NakedSingle)