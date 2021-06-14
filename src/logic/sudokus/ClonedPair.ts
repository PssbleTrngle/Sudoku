import { define } from ".";
import ClonedPair from "../strategies/ClonedPair";

define('Geklonte Paare', [
   [[4, 6, 9], [4, 6, 9], 8, 1, 3, [4, 9], 2, 5, 7],
   [[4, 9], 3, 2, 7, 5, 8, 1, [4, 9], 6],
   [7, 5, 1, [4, 9], 2, 6, 8, [4, 9], 3],
   [3, [2, 4], 5, [2, 4], 7, 1, 6, 8, 9],
   [[1, 2, 4, 6, 9], [1, 2, 4, 6, 9], [4, 9], [2, 4, 9], 8, 3, 5, 7, [2, 4]],
   [[2, 4, 9], 8, 7, 5, 6, [4, 9], 3, 1, [2, 4]],
   [5, [4, 9], [4, 9], 6, 1, 2, 7, 3, 8],
   [[1, 2], [1, 2], 3, 8, 9, 7, 4, 6, 5],
   [8, 7, 6, 3, 4, 5, 9, 2, 1]
], ClonedPair, 'Um ein geklontes Paar zu ermitteln, müssen Sie Felder suchen, die dasselbe Kandidatenpaar enthalten. Anschließend müssen Sie diese so zu einer Kette verbinden, dass immer zwei dieser Felder innerhalb einer Einheit sind. Im nebenstehenden Beispiel ist eine solche Kette aus 4er und 9er Paaren eingezeichnet. Nun empfiehlt es sich die Felder der Kette durchzunummerieren. Suchen Sie nach einem Feld, das Kandidaten des Paares enthält, und im Einflussbereich eines geraden und ungeraden Feldes der Kette liegt. Denn das Prinzip dieser Kette besagt, dass aufgrund der Tatsache, dass in allen Feldern der Kette nur dasselbe Kandidatenpaar vorliegt, diese immer abwechselnd entlang der Kette liegen müssen. Daher blockieren ein gerades und ein ungerades Feld der Kette ein Feld in deren Einflussbereich. In unserem Beispiel ist das erste Feld in der sechsten Zeile in der Reihe zweier solcher Felder. Deswegen müssen die 4 und die 9 als Kandidaten gestrichen werden.')


define('Geklonte Paare 2', [
            [4, 2, 5, [], 3, 9, 8, [], []],
   [6, [], 9, 8, 2, 4, 5, 3, []],
   [3, [], 8, 6, 5, [], 9, 2, 4],
   [1, 8, 6, 9, 4, [], 2, [], 3],
   [[], 4, 2, 3, 8, [], [], [], []],
   [[], [], 3, [], 6, 2, 4, 8, []],
   [8, 3, 4, 5, [], 6, [], [], 2],
   [2, 6, 7, 4, [], 8, 3, [], []],
   [[], [], 1, 2, 7, 3, 6, 4, 8]
        ], ClonedPair)
