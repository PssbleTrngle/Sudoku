import { define } from ".";
import HiddenQuadruple from "../strategies/HiddenQuadruple";

define('Versteckter Vierer', [
   [[4, 6, 8, 9], [4, 6, 8, 9], [4, 8], 7, 1, [3, 4, 8], 2, 5, [3, 4, 6]],
   [[2, 4, 9], 3, 1, 6, [2, 5], [4, 5], [4, 7, 9], [4, 7, 9], 8],
   [[2, 4, 6, 8], 5, 7, 9, [2, 3, 8], [3, 4, 8], [4, 6], 1, [3, 4, 6]],
   [[1, 2, 3, 5, 8, 9], [1, 2, 8, 9], [2, 3, 5, 8], [1, 3, 5, 8], 4, [1, 3, 5, 8], [6, 7, 9], [3, 7, 9], [3, 6, 7]],
   [[3, 4, 8, 9], 7, [3, 4, 8], [3, 8], 6, 2, 1, [3, 4, 9], 5],
   [[1, 3, 4, 5], [1, 4], 6, [1, 3, 5], 9, 7, 8, [3, 4], 2],
   [[1, 3, 4, 5, 7, 8], [4, 8], 9, 2, [3, 5, 8], [1, 3, 4, 5, 8], [4, 5, 7], 6, [4, 7]],
   [[4, 5, 6, 8], [4, 6, 8], [4, 5, 8], [4, 5, 8], 7, 9, 3, 2, 1],
   [[1, 3, 4, 5, 7], [1, 2, 4], [2, 3, 4, 5], [1, 3, 4, 5], [3, 5], 6, [4, 5, 7], 8, 9]
], HiddenQuadruple, 'Um einen versteckten Vierer zu ermitteln, suchen Sie nach vier Kandidaten, die in einer Einheit (Zeile, Spalte, Block) in genau vier Feldern vorkommen. In keinem der anderen Felder der Einheit darf sich einer der vier Kandidaten befinden. Im nebenstehenden Beispiel ist dies im linken unteren Block der Fall. Die blau markierten Felder bestehend aus 1, 2, 3 und 7 kommen in diesem Block nur in den blau umrandeten Feldern vor. Da diese Werte ausschließlich in diesen vier Feldern vorkommen, müssen diese auch dort eingetragen werden. Daher können alle anderen Kandidatenwerte in diesen Feldern gestrichen werden. Daher wurden dort die 4, 5 und 8 rot markiert. ')
