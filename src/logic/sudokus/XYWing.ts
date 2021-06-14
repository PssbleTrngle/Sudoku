import { define } from '.'
import XYWing from '../strategies/XYWing'

define('XY-Wing', [
   [3, [1, 9], [1, 9], 4, 5, 6, 7, 8, 2],
   [4, 8, 2, [1, 9], [3, 7, 9], [1, 3, 7], [5, 6], [1, 5, 9], [1, 6, 9]],
   [7, 6, 5, [1, 9], [2, 8, 9], [1, 2, 8], 3, [1, 4, 9], [1, 4, 9]],
   [5, 4, 6, 7, 1, 9, 2, 3, 8],
   [1, [7, 9], [7, 9], 2, [3, 8], [3, 8], 4, 6, 5],
   [8, 2, 3, 6, 4, 5, 9, [1, 7], [1, 7]],
   [9, [1, 5, 7], 8, 3, [6, 7], [1, 4, 7], [5, 6], 2, [4, 6, 7]],
   [2, [3, 5, 7], [4, 7], 8, [6, 9], [4, 7], 1, [5, 9], [3, 4, 6, 7, 9]],
   [6, [1, 3, 7], [1, 4, 7], 5, [2, 7, 9], [1, 2, 4, 7], 8, [4, 7, 9], [3, 4, 7, 9]]
], XYWing, 'Für diese Strategie benötigen Sie drei Felder, in zwei sich überlagernden Einheiten, die insgesamt nur drei Kandidaten beinhalten. Jedes dieser Felder darf außerdem nur zwei Kandidaten enthalten. In unserem Beispiel ist diese Konstellation mit den Kandidatenwerten 4, 5 und 7 gegeben. Die beiden Felder, die sich nicht in einer Einheit befinden verfügen über einen gleichen Kandidaten, die 5. Da dieser in eines der beiden Felder eingetragen werden muss, kann dieser Kandidat aus allen Feldern gestrichen werden, die sich im gemeinsamen Einflussbereich befinden. Dies beinhaltet alle Felder im rechten Block der dritten Zeile. Deshalb werden die beiden roten 5en gestrichen.')

define('XY-Wing-2', [
   [3, [1, 9], [1, 9], 4, 5, 6, 7, 8, 2],
   [4, 8, 2, [1, 9], [3, 7, 9], [1, 3, 7], [5, 6], [1, 5, 9], [1, 6, 9]],
   [7, 6, 5, [1, 9], [2, 8, 9], [1, 2, 8], 3, [1, 4, 9], [1, 4, 9]],
   [5, 4, 6, 7, 1, 9, 2, 3, 8],
   [1, [7, 9], [7, 9], 2, [3, 8], [3, 8], 4, 6, 5],
   [8, 2, 3, 6, 4, 5, 9, [1, 7], [1, 7]],
   [9, [1, 5, 7], 8, 3, [6, 7], [1, 4, 7], [5, 6], 2, [4, 6, 7]],
   [2, [3, 5, 7], [4, 7], 8, [6, 9], [4, 7], 1, [5, 9], [3, 4, 6, 7, 9]],
   [6, [1, 3, 7], [1, 4, 7], 5, [2, 7, 9], [1, 2, 4, 7], 8, [4, 7, 9], [3, 4, 7, 9]]
], XYWing)


define('XY-Wing-3', [
   [3, 4, 2, 5, [], 9, [], 1, []],
   [[], [], [], [], 6, 7, [], [], []],
   [[], 5, [], [], 2, [], [], 9, []],
   [[], 9, [], [], [], [], 7, [], []],
   [8, [], [], 9, 3, 6, 5, [], []],
   [1, 3, 4, [], [], [], [], [], 9],
   [5, 6, 1, [], [], [], [], 3, 2],
   [2, 8, [], 3, [], 5, [], [], 6],
   [[], [], [], [], [], [], [], [], 8]
], XYWing)


define('XY-Wing-4', [
   [[], [], [], 7, 1, [], 5, 2, []],
   [7, 1, 2, [], [], [], [], 3, []],
   [[], [], [], [], 9, [], 1, 8, 7],
   [[], 4, [], [], [], 6, 7, 9, []],
   [9, [], 6, 1, [], 7, 3, 5, 4],
   [3, [], 7, 9, [], 4, 2, [], []],
   [[], [], [], [], [], [], 8, [], 2],
   [[], 6, [], 8, 7, [], [], [], []],
   [5, [], 8, [], [], [], [], [], 3]
], XYWing)
