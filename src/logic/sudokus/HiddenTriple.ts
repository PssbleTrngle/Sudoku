import { define } from ".";
import HiddenTriple from "../strategies/HiddenTriple";

define('Versteckter Dreier', [
   [[2, 3, 5], [1, 3, 5], [1, 2, 5], 7, 4, [1, 3, 5, 6, 9], [1, 2, 3, 5, 9], [1, 3, 6, 9], 8],
   [4, 9, 6, [1, 5, 8], [1, 3, 8], [1, 3, 5, 8], [1, 2, 3, 5], [1, 3, 7], [2, 3, 5, 7]],
   [[3, 5, 7], [1, 3, 5, 7, 8], [1, 5, 7, 8], [1, 5, 6, 8, 9], 2, [1, 3, 5, 6, 8, 9], [1, 3, 5, 9], 4, [3, 5, 6, 7, 9]],
   [[2, 9], [1, 4], [1, 2, 9], [1, 2, 8, 9], 5, 7, 6, [3, 8, 9], [3, 4, 9]],
   [8, [4, 5, 6, 7], [5, 7, 9], [6, 9], [3, 6, 9], [3, 6, 9], [3, 4, 5, 9], 2, 1],
   [[2, 5, 6, 7, 9], [1, 5, 6, 7], 3, 4, [1, 6, 8, 9], [1, 2, 6, 8, 9], [5, 8, 9], [7, 8, 9], [5, 7, 9]],
   [[5, 6, 7, 9], [5, 6, 7, 8], [5, 7, 8, 9], 3, [1, 6, 8, 9], [1, 2, 4, 5, 6, 8, 9], [1, 2, 4, 8, 9], [1, 6, 8, 9], [2, 4, 6, 9]],
   [1, 2, 4, [6, 8, 9], 7, [6, 8, 9], [3, 8, 9], 5, [3, 6, 9]],
   [[3, 5, 6, 9], [3, 5, 6, 8], [5, 8, 9], [1, 2, 5, 6, 8, 9], [1, 6, 8, 9], [1, 2, 4, 5, 6, 8, 9], 7, [1, 3, 6, 8, 9], [2, 3, 4, 6, 9]]
], HiddenTriple, 'Um einen versteckten Dreier zu ermitteln, suchen Sie nach drei Kandidaten, die in einer Einheit (Zeile, Spalte, Block) in genau drei Feldern vorkommen. In keinem der anderen Felder der Einheit darf sich einer der drei Kandidaten befinden. Im nebenstehenden Beispiel ist dies in Zeile 5 der Fall. Die blau markierten Kandidaten bestehend aus 4, 5 und 7 kommen in dieser Zeile nur in den blau umrandeten Feldern vor. Da diese Werte ausschließlich in diesen drei Feldern vorkommen, müssen diese auch dort eingetragen werden. Daher können alle anderen Kandidatenwerte in diesen Feldern gestrichen werden. Daher wurden dort die 3, 6 und 9 rot markiert. ')
