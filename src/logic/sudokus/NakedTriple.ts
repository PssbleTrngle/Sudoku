import { define } from '.'
import NakedTriple from '../strategies/NakedTriple'

define('Nackter Dreier', [
   [[1, 3, 5, 6, 9], 7, [1, 4, 5, 6, 9], [1, 4], [2, 4, 5, 6], [1, 2, 3, 5], 8, [3, 4], [1, 3]],
   [[1, 3, 6], 2, [1, 4, 6], 8, [4, 6, 7], [1, 3, 7], 9, 5, [1, 3, 7]],
   [[1, 3, 5, 8], [1, 3, 5, 8], [1, 4, 5, 8], [1, 4, 7], [4, 5, 7], 9, 6, [3, 4, 7], 2],
   [[1, 5, 6, 7], [1, 5, 6], [1, 5, 6, 7], 3, [5, 7], 4, 2, 8, 9],
   [[2, 5, 7, 8], [5, 8], 3, 9, [2, 5, 7, 8], [2, 5, 7, 8], 1, 6, 4],
   [4, [8, 9], [2, 7, 8, 9], 6, 1, [2, 7, 8], 5, [3, 7], [3, 7]],
   [[3, 7, 8], 4, [7, 8], 2, 9, 6, [3, 7], 1, 5],
   [[1, 2, 3, 5, 7, 8], [1, 3, 5, 8], [1, 2, 5, 7, 8], [1, 4, 7], [4, 7, 8], [1, 7, 8], [3, 7], 9, 6],
   [[1, 6, 7, 9], [1, 6, 9], [1, 6, 7, 9], 5, 3, [1, 7], 4, 2, 8]
], NakedTriple, 'Ein nackter Dreier liegt vor, wenn sich in einer Einheit (Zeile, Spalte, Block) genau drei Felder befinden, in denen ausschließlich drei Kandidatenwerte vorkommen. Durchsuchen Sie dazu das Sudoku nach drei Feldern einer Einheit, in denen nur drei verschiedene Kandidatenwerte vorkommen. In unserem Beispiel ist dies in der ersten Zeile der Fall. Dort sehen Sie drei blau umrandete Felder, in denen nur 1er, 4er und 8er vorkommen. Da in eines dieser Felder sicher die 1, in eines sicher die 4 und in das letzte auf jeden Fall die 8 eingetragen werden muss, können Sie aus allen weiteren Felder dieser Einheit diese Kandidatenwerte streichen. Im Falle unseres Beispiels kann die rot markierte 1 gestrichen werden.')
