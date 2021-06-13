import { define } from ".";
import Kite from "../strategies/Kite";

define('Drachen', [
   [6, 4, [2, 7], 8, 5, 3, [1, 7], 9, [1, 2, 7]],
   [9, [3, 7], [2, 3, 7], 6, 4, 1, 8, 5, [2, 7]],
   [1, 5, 8, 7, 2, 9, 6, 4, 3],
   [3, 2, 5, 1, 6, 7, 9, 8, 4],
   [4, [6, 7], 1, 9, 8, 2, 3, [6, 7], 5],
   [8, 9, [6, 7], 4, 3, 5, [1, 7], 2, [1, 6, 7]],
   [2, [3, 6], 9, 5, 1, 8, 4, [3, 6, 7], [6, 7]],
   [7, 1, [3, 6], 2, 9, 4, 5, [3, 6], 8],
   [5, 8, 4, 3, 7, 6, 2, 1, 9]
], Kite, 'Um einen Drachen zu ermitteln, müssen Sie nach einer Zeile und einer Spalte suchen, in denen ein Kandidatenwert je zweimal vorkommt. Innerhalb dieser Reihen muss der Kandidatenwert in unterschiedlichen Blöcken liegen. Außerdem müssen sich ein Feld aus der Reihe und ein Feld aus der Spalte in einem gemeinsamen Block befinden, der keinen weiteren dieser Kandidatenwerte enthält. In unserem Beispiel haben wir Ihnen diese Zeile und Spalte mit den vier Feldern markiert. Nun müssen Sie die beiden nicht in einem Block befindlichen Felder betrachten. Ermitteln Sie den Schnittpunkt dieser beiden Felder. Falls sich darin auch ein Kandidat desselben Wertes befindet, können Sie diesen eliminieren. Im Beispiel sehen Sie, dass im achten Feld in der achten Zeile die 6 eliminiert werden kann. Dies resultiert daraus, dass aufgrund der Verkettung der vier Felder im linken unteren markierten Feld oder im rechten oberen markierten Feld eine 6 eingetragen werden muss. ')
