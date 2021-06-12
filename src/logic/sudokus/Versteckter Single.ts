import { define } from '.'
import HiddenSingle from '../strategies/HiddenSingle'

define('Versteckter Single', [
   [2, 6, 0, 0, 0, 0, 0, 0, 0],
   [1, 0, 0, 8, 0, 0, 0, 0, 0],
   [0, 0, 0, 9, 6, 2, 0, 0, 0],
   [0, 0, 0, 3, 0, 0, 7, 0, 0],
   [0, 0, 0, 0, 5, 0, 0, 0, 8],
   [0, 0, 2, 7, 4, 0, 0, 9, 0],
   [4, 0, 0, 0, 0, 0, 0, 2, 0],
   [7, 0, 3, 0, 0, 6, 0, 0, 0],
   [0, 0, 0, 0, 3, 0, 0, 8, 1],
], HiddenSingle, `

   Um einen versteckten Single zu finden, müssen Sie die neun Zahlenwerte nacheinander und einzeln untersuchen. 
   Wenn Sie eine Zahl untersuchen, dann markieren Sie alle Zeilen, Spalten und Blöcke, in denen eine dieser Zahlen liegt. 
   Sollte in einer Zeile, Spalte oder einem Block genau ein Feld frei bleiben, können Sie in dieses die untersuchte Zahl eintragen. 
   In unserem nebenstehenden Beispiel wird die 6 untersucht. Der Einfachheit halber haben wir für Sie nur die relevanten Felder der drei blau umrandeten 6en markiert.
   Sie können am Beispiel erkennen, dass in vierten Spalte nur ein Feld nicht blau markiert ist, da in dessen Reihe, Block und Spalte keine 6 liegt. Dort muss eine 6 eingetragen werden.
   Wir haben dies für Sie mit einer grünen 6 markiert.

`)
