import { define } from '.'
import ThirdEye from '../strategies/ThirdEye'

define('Drittes Auge', [
   [2, [8, 9], [8, 9], 7, 4, 3, 1, 6, 5],
   [3, 4, 6, 1, 8, 5, 9, 2, 7],
   [5, 7, 1, 6, 2, 9, 8, 3, 4],
   [6, 3, [5, 8], [2, 5], 1, [7, 8], [2, 5, 7], 4, 9],
   [7, [2, 9], [5, 9], 4, 3, 6, [2, 5], 1, 8],
   [1, [2, 8], 4, [2, 5], 9, [7, 8], 3, [5, 7], 6],
   [8, 6, 7, 3, 5, 1, 4, 9, 2],
   [9, 1, 2, 8, 6, 4, [5, 7], [5, 7], 3],
   [4, 5, 3, 9, 7, 2, 6, 8, 1]
], ThirdEye, 'Das dritte Auge können Sie anwenden, falls in allen leeren Feldern genau zwei Kandidaten vorkommen. Außer in einem Feld. In einem Feld müssen nämlich genau drei Kandidaten vorkommen. Falls Sie ein solches Feld gefunden haben müssen Sie die Einheit dieses Feldes betrachten. In unserem Beispiel ist dieses Feld in der siebten Spalte und in der vierten Zeile. Nun müssen Sie eine der Einheiten des Feldes finden, in der einer der Kandidatenwerte des Feldes dreimal als Kandidat vorkommt. Im nebenstehenden Sudoku können Sie erkennen, dass dies beispielsweise in der siebten Spalte der Fall ist. Nun muss der Wert in unser Feld eingetragen werden, der in dieser Einheit dreimal vorkommt. Da in den markierten Feldern dieser Spalte insgesamt drei 5en vorkommen, ist diese die Lösung. Daher können Sie die anderen Kandidaten aus dem Feld eliminieren.')


define('Drittes Auge 2', [
            [7, 2, 3, [], 4, 6, 1, 8, []],
   [[], 9, [], 2, 8, 1, 6, 3, 7],
   [8, 1, 6, [], 7, 3, [], 4, 2],
   [3, 6, 9, 1, 2, [], 8, [], []],
   [[], [], 2, 8, 6, 9, 3, [], []],
   [1, 8, [], 3, 5, [], 2, 9, 6],
   [9, [], [], 4, [], 2, 7, 6, 8],
   [2, [], [], 6, 9, 8, 4, [], []],
   [6, 4, 8, 7, [], 5, 9, 2, []]
        ], ThirdEye)
