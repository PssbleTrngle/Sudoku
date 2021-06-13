import { define } from '.'
import XYWing from '../strategies/XYWing'


define('XY-Wing', [
   [0, 0, 0, 9, 8, 0, 6, 0, 0],
   [4, 6, 0, 0, 2, 0, 1, 8, 9],
   [0, 9, 0, 0, 1, 6, 0, 0, 2],
   [0, 0, 3, 7, 5, 9, 0, 0, 0],
   [0, 5, 0, 2, 4, 1, 9, 0, 3],
   [0, 0, 0, 6, 3, 8, 0, 1, 0],
   [7, 0, 0, 0, 0, 0, 0, 0, 1],
   [0, 0, 1, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 1, 7, 5, 0, 2, 4],   
], XYWing)

define('XY-Wing_wrong', [
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
