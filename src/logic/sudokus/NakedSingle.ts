import { define } from '.'
import NakedSingle from '../strategies/NakedSingle'

define('Nackter Single', [
   [0, 5, 0, 0, 6, 3, 0, 9, 0],
   [1, 0, 0, 0, 2, 5, 0, 0, 0],
   [0, 0, 2, 0, 1, 8, 0, 4, 0],
   [0, 0, 0, 0, 7, 0, 0, 2, 0],
   [0, 0, 9, 2, 0, 0, 6, 0, 0],
   [4, 2, 0, 6, 5, 0, 3, 0, 0],
   [2, 0, 5, 0, 0, 6, 4, 0, 0],
   [9, 0, 1, 0, 0, 7, 0, 0, 0],
   [7, 0, 8, 0, 0, 2, 0, 0, 0],
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