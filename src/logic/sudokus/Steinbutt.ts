import { define } from '.'
import Steinbutt from '../strategies/Steinbutt'

define('Steinbutt', [
   [[2, 7, 9], 6, [3, 9], [2, 5, 7, 9], [2, 5, 9], 8, 1, 4, [2, 3, 7]],
   [[2, 7], 5, [1, 3], [1, 2, 4, 7], [1, 2, 4], 6, 9, 8, [2, 3, 7]],
   [4, 8, [1, 9], [1, 2, 7, 9], 3, [1, 7], 6, [2, 7], 5],
   [[5, 9], 2, 6, [1, 5, 7], 8, [1, 7], 3, [1, 9], 4],
   [[5, 9], 1, 4, 6, [2, 5], 3, 7, [2, 9], 8],
   [3, 7, 8, [1, 2, 4], [1, 2, 4], 9, 5, 6, [1, 2]],
   [6, 4, 5, 3, [1, 9], 2, 8, [1, 7, 9], [1, 7, 9]],
   [1, 9, 2, 8, 7, 5, 4, 3, 6],
   [8, 3, 7, [1, 9], 6, 4, 2, 5, [9]],
], Steinbutt, 'Um einen Steinbutt anzuwenden, müssen Sie nach einer Reihe suchen, in der ein Kandidat in genau zwei Feldern vorkommt. Außerdem müssen diese Felder in zwei verschiedenen Blöcken liegen. Im für Sie vorbereiteten Beispiel ist dies in der dritten Zeile mit der 2 der Fall. Diese beiden Felder wurden blau umrandet. Ausgehend von diesen Felder müssen Sie eine Kombination finden, mit der ausgehend von beiden Feldern ein weiteres Feld X mit einer 2 als Kandidat verbunden wird. Dazu muss von einem der Felder ausgehend ein senkrechtes Feld gefunden werden, das ebenfalls eine 2 enthält. Ausgehend vom anderen Feld muss eine Kombination über mehre Felder mit einer 2 als Kandidat zu eben diesem Feld gefunden werden. Dazu muss über ein Feld C in derselben Reihe auf ein Feld D, welches sich im selben Block wie Feld D befindet geschlossen werden. Das Feld D wiederrum muss in einer Reihe mit Feld X liegen. Diese Verkettung ist im Beispiel Sudoku durch Linien und umrandete Felder dargestellt. Das linke untere Feld ist das Feld X, aus welchem Sie die 2 als Kandidat streichen können. Dies ist so begründet, dass egal in welches der Felder in der dritten Zeile sie die 2 eintragen, dies immer zur Folge hat, dass die 2 in Feld X gestrichen werden muss. Entweder direkt über das darüber liegende Feld oder indirekt über die anderen Felder.')

define('Steinbutt 2', [
   [7, [2, 4, 6, 9], [1, 2, 4], 5, [1, 2, 3, 9], [1, 3, 6, 9], [1, 3, 4], [2, 3, 4], 8],
   [[2, 4, 8, 9], [2, 4, 9], 5, [2, 3, 9], 7, [1, 3, 8, 9], 6, [2, 3, 4], [1, 2, 3, 4]],
   [[2, 6, 8], 3, [1, 2, 8], 4, [1, 2, 8], [1, 6, 8], 7, 9, 5],
   [[2, 5, 9], [2, 5, 7, 9], [2, 3, 7], 1, [2, 3, 9], 4, 8, [2, 3, 5, 6, 7], [2, 3, 6, 9]],
   [[2, 4, 5, 9], 8, [2, 3, 4, 7], [2, 3, 7, 9], 6, [3, 7, 9], [3, 4, 5, 9], 1, [2, 3, 4, 9]],
   [1, [2, 4, 7, 9], 6, 8, [2, 3, 9], 5, [3, 4, 9], [2, 3, 4, 7], [2, 3, 4, 9]],
   [[4, 5, 6], 1, [4, 7], [3, 6, 7, 9], [3, 4, 9], 2, [3, 4, 5, 9], 8, [3, 4, 6, 9]],
   [[4, 6, 8], [4, 6, 7], 9, [3, 6, 7], 5, [1, 3, 6, 7, 8], 2, [3, 4, 6], [1, 3, 4, 6]],
   [3, [2, 4, 5, 6], [2, 4, 8], [6, 9], [1, 4, 8, 9], [1, 6, 8, 9], [1, 4, 5, 9], [4, 5, 6], 7]
], Steinbutt)