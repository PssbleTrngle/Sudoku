import { define } from '.'
import RBC from '../strategies/RBC'

define('RBC', [
   [1, 2, [3, 4], [3, 4, 7], 5, 6, [3, 7, 9], 8, [4, 9]],
   [[3, 4, 8], [4, 7, 8], 5, 9, [3, 7, 8], 1, [2, 3, 7], [2, 3, 4], 6],
   [[3, 4, 8, 9], [4, 7, 8, 9], 6, [3, 4, 7, 8], [3, 7, 8], 2, 1, [3, 4], 5],
   [[5, 8], 1, 2, [3, 5, 6, 8], [3, 6, 8, 9], [5, 9], 4, [5, 6], 7],
   [[4, 5, 8], 3, [4, 8], 1, [6, 7, 8, 9], [4, 5, 7, 9], [2, 5, 6, 8, 9], [2, 5, 6], [2, 8, 9]],
   [7, 6, 9, [4, 5, 8], 2, [4, 5], [5, 8], 1, 3],
   [[2, 3, 4, 5, 6], [4, 5], 7, [5, 6], 1, 8, [2, 3, 5, 6], 9, [2, 4]],
   [[3, 4, 5, 6, 8, 9], [4, 5, 8, 9], [1, 3, 4, 8], 2, [6, 7, 9], [5, 7, 9], [3, 5, 6, 8], [3, 4, 5, 6], [1, 4, 8]],
   [[2, 5, 6, 8, 9], [5, 8, 9], [1, 8], [5, 6], 4, 3, [2, 5, 6, 8], 7, [1, 2, 8]]
], RBC, `Um einen Reihe-Block-Check zu entdecken, müssen Sie nach einer Reihe (Spalte oder Zeile) suchen, in welcher alle Kandidaten eines Wertes in einem Block vorkommen. Zusätzlich müssen innerhalb des Blocks weitere Kandidaten des jeweiligen Wertes vorkommen. Im Beispiel Sudoku kommen in Zeile 4 alle Kandidaten für eine 9 nur innerhalb des mittleren Blocks vor. Die entsprechende Zeile und der Block sind hellblau eingefärbt. Außerdem befinden sich im mittleren Block weitere 9er Kandidaten.
Da die beiden 9er in der vierten Zeile die einzigen in dieser Reihe sind, muss einer von beiden der richtige sein. Daher sind anderen die 9er Kandidaten innerhalb des Blocks auf jeden Fall falsch und können somit gestrichen werden. Deshalb sind diese rot markiert.
`)

define('RBC 2', [
   [[3, 6, 9], [3, 6, 9], 2, [5, 6, 9], [5, 6, 7, 9], 1, [3, 5, 7], 4, 8],
   [[1, 3, 6, 8], [3, 6, 8], [3, 5, 6], 2, [4, 5, 6, 7, 8], [4, 5, 6, 7], [3, 5, 7], 9, [1, 5, 7]],
   [4, 7, [5, 9], 3, [5, 8, 9], [5, 9], 6, [1], [1, 2, 5]],
   [[6, 9], 1, [6, 7, 9], [5, 6, 8, 9], 3, 2, [5, 7, 8, 9], [6, 8], [4, 5, 6, 7]],
   [[3, 6, 9], 2, [3, 6, 7, 9], [1, 5, 6, 8, 9], [1, 4, 5, 6, 7, 8, 9], [4, 5, 6, 7, 9], [5, 7, 8, 9], [6, 8], [4, 5, 6, 7]],
   [5, 4, 8, [6, 9], [6, 7, 9], [6, 7, 9], 1, 2, 3],
   [[2, 3, 6, 9], [3, 6, 9], [3, 6, 9], 7, [1, 2, 6, 9], 8, 4, 5, [1, 2, 6]],
   [[2, 3, 6, 8], 5, 4, [1, 6], [1, 2, 6], [3, 6], [2, 3, 8], 7, 9],
   [7, [3, 6, 8, 9], 1, 4, [2, 5, 6, 9], [3, 5, 6, 9], [2, 3, 8], [3, 6, 8], [2, 6]]
], RBC, ``)


define('RBC 2', [
            [[], [], [], 5, 4, 6, [], [], 9],
   [[], 2, [], [], [], [], [], [], 7],
   [[], [], 3, 9, [], [], [], [], 4],
   [9, [], 5, [], [], [], [], 7, []],
   [7, [], [], [], [], [], [], 2, []],
   [[], [], [], [], 9, 3, [], [], []],
   [[], 5, 6, [], [], 8, [], [], []],
   [[], 1, [], [], 3, 9, [], [], []],
   [[], [], [], [], [], [], 8, [], 6]
        ], RBC, ``)
