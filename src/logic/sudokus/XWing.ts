import { define } from '.'
import XWing from '../strategies/XWing'

define('X-Wing', [
   [1, 0, 0, 0, 0, 0, 0, 8, 0],
   [8, 0, 0, 1, 0, 0, 0, 2, 4],
   [7, [5], 0, [5], 0, 3, [5], 5, 0],
   [0, 0, 0, 0, 4, 1, 6, 9, 2],
   [0, 9, 0, 6, 7, 0, 4, 1, 3],
   [4, 1, 6, 2, 3, 9, 8, 7, 5],
   [9, 0, 1, [5], 6, 2, [5], 0, 8],
   [0, 0, 0, 3, 0, 0, 9, 0, 1],
   [0, 5, 0, 9, 1, 0, 2, 0, 7],
], XWing, 'Um einen X Wing anzuwenden, müssen Sie nach zwei Zeilen suchen, in denen ein Kandidatenwert genau zweimal vorkommt. Diese vier Kandidatenwerte sollten außerdem in genau zwei Spalten liegen. Im Beispiel sind diese vier Felder blau umrandet und der vorkommende Kandidatenwert ist die 8. Nun müssen Sie nach weiteren Kandidaten dieses Wertes in den beiden Spalten suchen. Diese können Sie streichen, da der Wert in einer diagonalen Konstellation dieser vier Eckfelder eingetragen werden muss. Im Beispiel sehen Sie, wie die 8en in den markierten Spalten gestrichen wurden. Diese Strategie ist außerdem auch umgekehrt anwendbar für Spalten mit nur je zwei Kandidatenwerten und dem Streichen aus zwei Zeilen.')

define('X-Wing 2', [
   [3, [1, 4, 7, 8], [4, 7, 8], [4, 7, 9], [1, 4, 7, 9], 5, [1, 6, 7, 9], [1, 6, 7, 8], 2],
   [[4, 5], 9, [2, 4, 5, 7, 8], [4, 7], 6, [1, 2, 3, 4, 7], [1, 3, 5, 7], [1, 7, 8], [3, 5, 7]],
   [[5], [1, 2, 7], 6, [7, 9], [1, 2, 7, 9], 8, [1, 3, 5, 7, 9], [1, 7], 4],
   [8, [2, 3, 6], [2, 3], 1, 5, [7], 4, 9, [3, 6, 7]],
   [7, 5, [2, 4, 9], 3, [4, 9], 6, [1, 2], [1, 2], 8],
   [1, [3, 4, 6], [3, 4, 9], 2, [4, 7, 8, 9], [4, 7], [3, 6, 7], 5, [3, 6, 7]],
   [[4, 5, 9], [4, 7, 8], [4, 5, 7, 8, 9], 6, [2, 4, 7, 8], [2, 4, 7], [2, 5, 7, 9], 3, 1],
   [2, [4, 6, 7, 8], [4, 5, 7, 8, 9], [4, 5, 7, 8], 3, [1, 4, 7], [5, 6, 7, 9], [4, 6, 7], [5, 6, 9]],
   [[4, 5, 6], [3, 4, 6, 7], 1, [4, 5, 7], [2, 4, 7], 9, 8, [2, 4, 6, 7], [5, 6, 7]]
])
