import { define } from ".";
import NakedQuadruple from "../strategies/NakedQuadruple";

define('Nackter Vierer', [
   [[2, 3, 4, 8], [5, 7, 8], 9, 1, [3, 4, 5], [3, 5], [2, 5, 6, 7], [5, 7, 8], [3, 4, 6, 8]],
   [6, [5, 7], [3, 4, 5, 7], 2, [3, 4, 5], 8, 1, [5, 7, 9], [3, 9]],
   [[2, 3, 8], 1, [3, 5], 7, 6, 9, [2, 5], [], [3, 8]],
   [5, 2, 8, 9, 1, 4, 3, 6, 7],
   [[1, 4], 3, [1, 4], 6, 8, 7, [5, 9], [5, 9], 2],
   [7, 9, 6, 3, [2, 5], [2, 5], 8, 1, 4],
   [[1, 3, 8], 4, [1, 3, 7], 5, 9, [3, 6], [6, 7], 2, [1, 6, 8]],
   [9, 6, 2, 8, 7, 1, 4, 3, 5],
   [[1, 3], [5, 7, 8], [1, 3, 5, 7], 4, [2, 3], [2, 3, 6], [6, 7, 9], [7, 8, 9], [1, 6]]
], NakedQuadruple, 'Ein nackter Vierer liegt vor, wenn sich in einer Einheit (Zeile, Spalte, Block) genau vier Felder befinden, in denen ausschließlich vier Kandidatenwerte vorkommen. Durchsuchen Sie dazu das Sudoku nach vier Feldern einer Einheit, in denen nur vier verschiedene Kandidatenwerte vorkommen. In unserem Beispiel ist dies in der letzten Zeile der Fall. Dort sehen Sie vier blau umrandete Felder, in denen nur 1er, 2er, 3er und 6er vorkommen. Da in eines dieser Felder sicher die 1, in eines sicher die 2, in eines sicher die 3 und in das letzte auf jeden Fall die 6 eingetragen werden muss, können Sie aus allen weiteren Felder dieser Einheit diese Kandidatenwerte streichen. Im Falle unseres Beispiels können die rot markierte 1, 3 und 6 gestrichen werden.')


define('Nackter Vierer 2', [
            [2, 1, [], [], [], [], 4, [], []],
   [[], [], [], [], 2, 8, [], [], []],
   [[], [], [], [], [], [], 1, [], 6],
   [[], [], [], 5, [], 7, 6, [], 8],
   [8, 3, [], [], [], [], [], [], 7],
   [[], [], [], [], 1, 6, [], [], 3],
   [[], 4, 2, 3, [], [], [], [], []],
   [[], 5, 3, [], [], [], [], 7, []],
   [[], [], 7, 9, [], [], [], [], []]
        ], NakedQuadruple)
