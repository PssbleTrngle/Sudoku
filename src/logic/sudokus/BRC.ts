import { define } from '.'
import BRC from '../strategies/BRC'

define('BRC', [
   [0, 0, 0, 9, 2, 3, 1, 0, 0],
   [5, 0, 7, 0, 0, 0, 0, 8, 0],
   [2, 0, 1, 0, 8, 0, 0, 0, 0],
   [0, 4, 0, 0, 0, 0, 6, 0, 0],
   [0, 0, 0, 0, 5, 0, 0, 2, 0],
   [0, 1, 0, 0, 0, 0, 0, 0, 0],
   [8, 0, 0, 0, 7, 0, 0, 0, 0],
   [0, 0, 0, 6, 0, 0, 4, 0, 0],
   [0, 0, 0, 3, 0, 0, 0, 0, 9],
], BRC, 'In Abbildung 14 ist der betreffende Kandidatenwert die 9. Dieser kommt in der vierten Zeile nur im mittleren Block vor. Diese Felder sind daher blau umrandet. Da die restlichen 9er im mittleren Block gestrichen werden können sind diese in Abbildung 14 rot markiert.')

define('BRC 2', [
   [4, [3, 5, 7, 8, 9], [3, 5, 7, 8], [2, 7, 9], [1, 2, 7, 9], [2, 3, 7], [1, 3, 5, 8], [2, 3, 8], 6],
   [2, [3, 6, 9], [3, 6], 8, 5, [3, 6], 4, 7, [1]],
   [[3, 6, 7], [3, 5, 6, 7, 8], 1, [2, 6, 7], [2, 6, 7], 4, 9, [2, 3, 8], [2, 5]],
   [[1, 3, 6, 7, 9], [1, 3, 5, 6, 7, 8, 9], [3, 5, 6, 7, 8], 4, [2, 6, 7], [2, 6, 7, 8], [3, 5, 7, 8], [3, 6, 8, 9], [5, 7, 9]],
   [[3, 6, 7, 9], 2, 4, 1, [6, 7], [6, 7, 8], [3, 5, 7, 8], [3, 6, 8, 9], [5, 7, 9]],
   [[6, 7], [6, 7, 8], [6, 7, 8], 5, 3, 9, 2, 1, 4],
   [5, [3, 4, 6, 7], [2, 3, 6, 7], [2, 6, 7, 9], 8, 1, [7], [2, 4, 9], [2, 7, 9]],
   [[1, 7], [1, 4, 7], [2, 7], 3, [2, 4, 7, 9], 5, 6, [2, 4, 9], 8],
   [8, [1, 4, 6, 7], 9, [2, 6, 7], [2, 4, 6, 7], [2, 6, 7], [1, 7], 5, 3]
], BRC)
