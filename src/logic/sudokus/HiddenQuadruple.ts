import { define } from ".";
import HiddenQuadruple from "../strategies/HiddenQuadruple";

define('Versteckter Vierer', [
   [[4, 6, 8, 9], [4, 6, 8, 9], [4, 8], 7, 1, [3, 4, 8], 2, 5, [3, 4, 6]],
   [[2, 4, 9], 3, 1, 6, [2, 5], [4, 5], [4, 7, 9], [4, 7, 9], 8],
   [[2, 4, 6, 8], 5, 7, 9, [2, 3, 8], [3, 4, 8], [4, 6], 1, [3, 4, 6]],
   [[1, 2, 3, 5, 8, 9], [1, 2, 8, 9], [2, 3, 5, 8], [1, 3, 5, 8], 4, [1, 3, 5, 8], [6, 7, 9], [3, 7, 9], [3, 6, 7]],
   [[3, 4, 8, 9], 7, [3, 4, 8], [3, 8], 6, 2, 1, [3, 4, 9], 5],
   [[1, 3, 4, 5], [1, 4], 6, [1, 3, 5], 9, 7, 8, [3, 4], 2],
   [[1, 3, 4, 5, 7, 8], [4, 8], 9, 2, [3, 5, 8], [1, 3, 4, 5, 8], [4, 5, 7], 6, [4, 7]],
   [[4, 5, 6, 8], [4, 6, 8], [4, 5, 8], [4, 5, 8], 7, 9, 3, 2, 1],
   [[1, 3, 4, 5, 7], [1, 2, 4], [2, 3, 4, 5], [1, 3, 4, 5], [3, 5], 6, [4, 5, 7], 8, 9]
], HiddenQuadruple)