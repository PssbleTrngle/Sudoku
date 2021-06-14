import { define } from '.'
import HiddenPair from '../strategies/HiddenPair'

define('Verstecktes Paar', [
   [[1, 2, 3, 8, 9], [1, 2, 3, 8], [2, 3, 5, 6, 8, 9], [3, 5, 6], [1, 3, 5, 6, 8, 9], [1, 3, 5, 6, 8, 9], [1, 2, 4, 7, 8], [1, 2, 4, 5, 7], [5, 7, 8, 9]],
   [4, [1, 2, 3, 8], [2, 3, 5, 8, 9], [3, 5], 7, [1, 3, 5, 8, 9], 6, [1, 2, 5], [5, 8, 9]],
   [[1, 8, 9], 7, [5, 6, 8, 9], 2, [1, 5, 6, 8, 9], 4, 3, [1, 5], [5, 8, 9]],
   [[1, 2, 3, 7], [1, 2, 3], [2, 3, 7], 9, [1, 3, 5, 6], [1, 2, 3, 5, 6, 7], [1, 7], 8, 4],
   [[1, 3, 7, 8], 6, [3, 4, 7, 8], [3, 4], [1, 3, 4, 8], [1, 3, 7, 8], 5, 9, 2],
   [5, 9, [2, 3, 4, 7, 8], [3, 4, 6], [1, 3, 4, 6, 8], [1, 2, 3, 6, 7, 8], [1, 7], [1, 3, 6, 7], [3, 6, 7]],
   [[3, 7], 4, [3, 7], 8, 2, [3, 5, 6], 9, [3, 5, 6, 7], 1],
   [[2, 3, 7, 8, 9], [2, 3, 8], [2, 3, 7, 8, 9], 1, [3, 4, 5, 6, 9], [3, 5, 6, 9], [2, 4, 7, 8], [2, 3, 4, 5, 6, 7], [3, 5, 6, 7, 8]],
   [6, 5, 1, 7, [3, 4, 9], [3, 9], [2, 4, 8], [2, 3, 4], [3, 8]]
], HiddenPair, 'Um ein verstecktes Paar zu ermitteln, suchen Sie nach einem Kandidatenpaar, das in einer Einheit (Zeile, Spalte, Block) in genau zwei Feldern vorkommt. In keinem der anderen Felder der Einheit darf sich einer der beiden Kandidaten befinden. Im nebenstehenden Beispiel ist dies in Zeile 4 der Fall. Das blau markierte Paar bestehend aus 5 und 6 kommt in dieser Zeile nur in den blau umrandeten Feldern vor. Da diese Werte ausschließlich in diesen beiden Feldern vorkommen, müssen diese auch dort eingetragen werden. Daher können alle anderen Kandidatenwerte in diesen Feldern gestrichen werden. Daher wurden diese 1er, 2er, 3er und die 7 rot markiert. ')


define('Verstecktes Paar 2', [
            [[], [], [], [], [], [], [], [], 1],
   [[], [], 9, 3, [], [], 7, [], []],
   [[], [], 7, 9, [], [], 4, [], []],
   [6, 2, [], [], 5, [], [], [], []],
   [7, [], [], [], 8, [], [], 9, []],
   [1, [], [], [], [], [], [], 8, 4],
   [[], 6, 1, [], [], 3, [], [], []],
   [[], 3, [], 7, [], 5, [], [], 6],
   [[], [], [], [], [], 2, 1, [], 5]
        ], HiddenPair)
