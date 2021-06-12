import { define } from '.'

define('Nacktes Paar', [
   [0, 0, 0, 1, 3, 7, 0, 0, 0],
   [7, 0, 0, 5, 9, 6, 1, 3, 0],
   [0, 0, 9, 0, 8, 0, 0, 6, 0],
   [0, 0, 3, 0, 2, 0, 0, 0, 0],
   [5, 0, 0, 8, 0, 0, 9, 2, 0],
   [0, 2, 0, 0, 1, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 8],
   [8, 7, 4, 0, 0, 0, 0, 0, 0],
   [0, 6, 5, 3, 4, 8, 0, 0, 0],
], Nacktes Paar, 'Ein nacktes Paar liegt vor, wenn sich in einer Einheit (Zeile, Spalte, Block) genau zwei Felder befinden, in denen ausschließlich das gleiche Kandidatenpaar vorkommt. Durchsuchen Sie dazu das Sudoku nach Feldern, in denen nur zwei Kandidaten vorkommen. Haben Sie ein solches Feld gefunden, dann suchen Sie nach einem Feld, das in derselben Einheit liegt und ebenfalls nur dieses Kandidatenpaar enthält. In unserem Beispiel ist dies in der dritten Zeile der Fall. Dort sehen Sie zwei blau umrandete Felder, in denen nur eine 2 und eine 4 vorkommen. Da in eines dieser Felder sicher die 4 und in das andere auf jeden Fall die 2 eingetragen werden muss, können Sie aus allen weiteren Felder dieser Einheit diese Kandidatenwerte streichen. Im Falle unseres Beispiels können die rot markierten 2er und 4er gestrichen werden.')
