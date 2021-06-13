import { define } from '.'
import HiddenSingle from '../strategies/HiddenSingle'

define('Versteckter Single', [
   [2, 6, [4, 5, 7, 8, 9], [1, 4, 5], [1, 7], [1, 3, 4, 5, 7], [1, 3, 4, 5, 8, 9], [1, 3, 4, 5, 7], [3, 4, 5, 7, 9]],
   [1, [3, 4, 5, 7, 9], [4, 5, 7, 9], 8, [7], [3, 4, 5, 7], [2, 3, 4, 5, 6, 9], [3, 4, 5, 6, 7], [2, 3, 4, 5, 6, 7, 9]],
   [[3, 5, 8], [3, 4, 5, 7, 8], [4, 5, 7, 8], 9, 6, 2, [1, 3, 4, 5, 8], [1, 3, 4, 5, 7], [3, 4, 5, 7]],
   [[5, 6, 8, 9], [1, 4, 5, 8, 9], [1, 4, 5, 6, 8, 9], 3, [1, 2, 8, 9], [1, 8, 9], 7, [1, 4, 5, 6], [2, 4, 5, 6]],
   [[3, 6, 9], [1, 3, 4, 7, 9], [1, 4, 6, 7, 9], [1, 2, 6], 5, [1, 9], [1, 2, 3, 4, 6], [1, 3, 4, 6], 8],
   [[3, 5, 6, 8], [1, 3, 5, 8], 2, 7, 4, [1, 8], [1, 3, 5, 6], 9, [3, 5, 6]],
   [4, [1, 5, 8, 9], [1, 5, 6, 8, 9], [1, 5], [1, 7, 8, 9], [1, 5, 7, 8, 9], [3, 5, 6, 9], 2, [3, 5, 6, 7, 9]],
   [7, [1, 2, 5, 8, 9], 3, [1, 2, 4, 5], [1, 2, 8, 9], 6, [4, 5, 9], [4, 5], [4, 5, 9]],
   [[5, 6, 9], [2, 5, 9], [5, 6, 9], [2, 4, 5], 3, [4, 5, 7, 9], [4, 5, 6, 9], 8, 1]
], HiddenSingle, `

   Um einen versteckten Single zu finden, müssen Sie die neun Zahlenwerte nacheinander und einzeln untersuchen. 
   Wenn Sie eine Zahl untersuchen, dann markieren Sie alle Zeilen, Spalten und Blöcke, in denen eine dieser Zahlen liegt. 
   Sollte in einer Zeile, Spalte oder einem Block genau ein Feld frei bleiben, können Sie in dieses die untersuchte Zahl eintragen. 
   In unserem nebenstehenden Beispiel wird die 6 untersucht. Der Einfachheit halber haben wir für Sie nur die relevanten Felder der drei blau umrandeten 6en markiert.
   Sie können am Beispiel erkennen, dass in vierten Spalte nur ein Feld nicht blau markiert ist, da in dessen Reihe, Block und Spalte keine 6 liegt. Dort muss eine 6 eingetragen werden.
   Wir haben dies für Sie mit einer grünen 6 markiert.

`)

define('Versteckter Single 2', [
   [9, 0, 0, 0, 0, 0, 0, 0, 0],
   [3, 0, 0, 0, 6, 0, 0, 2, 0],
   [0, 0, 5, 0, 0, 0, 7, 0, 3],
   [0, 3, 1, 0, 8, 4, 0, 0, 0],
   [8, 2, 0, 0, 1, 0, 5, 4, 9],
   [0, 4, 0, 0, 0, 0, 8, 0, 0],
   [7, 5, 0, 1, 0, 6, 0, 8, 0],
   [4, 0, 0, 8, 0, 0, 1, 0, 0],
   [0, 0, 0, 7, 0, 0, 0, 0, 0],
], HiddenSingle)
