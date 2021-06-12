import { define } from '.'
import NakedTriple from '../strategies/NakedTriple'

define('Nackter Dreier', [
   [0, 7, 0, 0, 0, 0, 8, 0, 0],
   [0, 2, 0, 8, 0, 0, 9, 5, 0],
   [0, 0, 0, 0, 0, 9, 6, 0, 2],
   [0, 0, 0, 3, 0, 4, 2, 8, 9],
   [0, 0, 3, 9, 0, 0, 1, 6, 4],
   [4, 0, 0, 6, 1, 0, 5, 0, 0],
   [0, 4, 0, 2, 9, 6, 0, 1, 5],
   [0, 0, 0, 0, 0, 0, 0, 9, 6],
   [0, 0, 0, 5, 3, 0, 4, 2, 8],
], NakedTriple, 'Ein nackter Dreier liegt vor, wenn sich in einer Einheit (Zeile, Spalte, Block) genau drei Felder befinden, in denen ausschließlich drei Kandidatenwerte vorkommen. Durchsuchen Sie dazu das Sudoku nach drei Feldern einer Einheit, in denen nur drei verschiedene Kandidatenwerte vorkommen. In unserem Beispiel ist dies in der ersten Zeile der Fall. Dort sehen Sie drei blau umrandete Felder, in denen nur 1er, 4er und 8er vorkommen. Da in eines dieser Felder sicher die 1, in eines sicher die 4 und in das letzte auf jeden Fall die 8 eingetragen werden muss, können Sie aus allen weiteren Felder dieser Einheit diese Kandidatenwerte streichen. Im Falle unseres Beispiels kann die rot markierte 1 gestrichen werden.')
