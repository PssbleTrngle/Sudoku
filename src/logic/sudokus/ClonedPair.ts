import { define } from ".";
import ClonedPair from "../strategies/ClonedPair";

define('Geklonte Paare', `
   00813 257
   0327581 6
   751 268 3
   3 5 71689
   00008357
   08756 31
   5  612738
   003897465
   876345921
`, ClonedPair, 'Um ein geklontes Paar zu ermitteln, müssen Sie Felder suchen, die dasselbe Kandidatenpaar enthalten. Anschließend müssen Sie diese so zu einer Kette verbinden, dass immer zwei dieser Felder innerhalb einer Einheit sind. Im nebenstehenden Beispiel ist eine solche Kette aus 4er und 9er Paaren eingezeichnet. Nun empfiehlt es sich die Felder der Kette durchzunummerieren. Suchen Sie nach einem Feld, das Kandidaten des Paares enthält, und im Einflussbereich eines geraden und ungeraden Feldes der Kette liegt. Denn das Prinzip dieser Kette besagt, dass aufgrund der Tatsache, dass in allen Feldern der Kette nur dasselbe Kandidatenpaar vorliegt, diese immer abwechselnd entlang der Kette liegen müssen. Daher blockieren ein gerades und ein ungerades Feld der Kette ein Feld in deren Einflussbereich. In unserem Beispiel ist das erste Feld in der sechsten Zeile in der Reihe zweier solcher Felder. Deswegen müssen die 4 und die 9 als Kandidaten gestrichen werden.')
