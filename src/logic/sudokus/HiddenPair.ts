import { define } from '.'
import HiddenPair from '../strategies/HiddenPair'

define('Verstecktes Paar', [
   [0, 0, 0, 0, 0, 0, 0, 0, 0],
   [4, 0, 0, 0, 7, 0, 6, 0, 0],
   [0, 7, 0, 2, 0, 4, 3, 0, 0],
   [0, 0, 0, 9, 0, 0, 0, 8, 4],
   [0, 6, 0, 0, 0, 0, 5, 9, 2],
   [5, 9, 0, 0, 0, 0, 0, 0, 0],
   [0, 4, 0, 8, 2, 0, 9, 0, 1],
   [0, 0, 0, 1, 0, 0, 0, 0, 0],
   [6, 5, 1, 7, 0, 0, 0, 0, 0],
], HiddenPair, 'Um ein verstecktes Paar zu ermitteln, suchen Sie nach einem Kandidatenpaar, das in einer Einheit (Zeile, Spalte, Block) in genau zwei Feldern vorkommt. In keinem der anderen Felder der Einheit darf sich einer der beiden Kandidaten befinden. Im nebenstehenden Beispiel ist dies in Zeile 4 der Fall. Das blau markierte Paar bestehend aus 5 und 6 kommt in dieser Zeile nur in den blau umrandeten Feldern vor. Da diese Werte ausschließlich in diesen beiden Feldern vorkommen, müssen diese auch dort eingetragen werden. Daher können alle anderen Kandidatenwerte in diesen Feldern gestrichen werden. Daher wurden diese 1er, 2er, 3er und die 7 rot markiert. ')
