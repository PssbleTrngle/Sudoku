import { define } from '.'
import NakedPair from '../strategies/NakedPair'

define('Nacktes Paar', [
   [[2, 4, 6], [4, 5, 8], [2, 6, 8], 1, 3, 7, [2, 4, 5, 8], [4, 5, 8, 9], [2, 4, 5, 9]],
   [7, [4, 8], [2, 8], 5, 9, 6, 1, 3, [2, 4]],
   [[1, 2, 3, 4], [1, 3, 4, 5], 9, [2, 4], 8, [2, 4], [2, 4, 5, 7], 6, [2, 4, 5, 7]],
   [[1, 4, 6, 9], [1, 4, 8, 9], 3, [4, 6, 7, 9], 2, [4, 5, 9], [4, 5, 6, 7, 8], [1, 4, 5, 7, 8], [1, 4, 5, 6, 7]],
   [5, [1, 4], [1, 6, 7], 8, [6, 7], [3, 4], 9, 2, [1, 3, 4, 6, 7]],
   [[4, 6, 9], 2, [6, 7, 8], [4, 6, 7, 9], 1, [3, 4, 5, 9], [3, 4, 5, 6, 7, 8], [4, 5, 7, 8], [3, 4, 5, 6, 7]],
   [[1, 2, 3, 9], [1, 3, 9], [1, 2], [2, 6, 7, 9], [5, 6, 7], [1, 2, 5, 9], [2, 3, 4, 5, 6, 7], [1, 4, 5, 7, 9], 8],
   [8, 7, 4, [2, 6, 9], [5, 6], [1, 2, 5, 9], [2, 3, 5, 6], [1, 5, 9], [1, 2, 3, 5, 6, 9]],
   [[1, 2, 9], 6, 5, 3, 4, 8, [2, 7], [1, 7, 9], [1, 2, 7, 9]]
], NakedPair, 'Ein nacktes Paar liegt vor, wenn sich in einer Einheit (Zeile, Spalte, Block) genau zwei Felder befinden, in denen ausschließlich das gleiche Kandidatenpaar vorkommt. Durchsuchen Sie dazu das Sudoku nach Feldern, in denen nur zwei Kandidaten vorkommen. Haben Sie ein solches Feld gefunden, dann suchen Sie nach einem Feld, das in derselben Einheit liegt und ebenfalls nur dieses Kandidatenpaar enthält. In unserem Beispiel ist dies in der dritten Zeile der Fall. Dort sehen Sie zwei blau umrandete Felder, in denen nur eine 2 und eine 4 vorkommen. Da in eines dieser Felder sicher die 4 und in das andere auf jeden Fall die 2 eingetragen werden muss, können Sie aus allen weiteren Felder dieser Einheit diese Kandidatenwerte streichen. Im Falle unseres Beispiels können die rot markierten 2er und 4er gestrichen werden.')


define('Nacktes Paar 2', [
            [[], 1, [], 6, [], [], [], [], []],
   [[], [], [], [], [], [], 3, 5, []],
   [[], 5, [], 4, [], [], [], 2, []],
   [[], [], [], [], [], [], 9, 1, 2],
   [[], [], 2, [], 8, [], 6, [], []],
   [[], [], 7, [], 9, [], [], [], []],
   [8, [], [], [], 6, [], 2, [], 1],
   [2, [], [], 8, [], 4, [], [], []],
   [4, [], [], [], 5, 3, 8, [], 9]
        ], NakedPair)
