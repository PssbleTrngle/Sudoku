import { define } from ".";
import Skyscraper from "../strategies/Skyscraper";

define('Wolkenkratzer', [
   [[1, 7], [4, 7, 9], [1, 4, 7], [1, 4, 5, 6, 8], 2, [5, 6, 7, 9], [1, 4, 7, 8, 9], [1, 3, 7, 8], [1, 3, 4, 6, 8, 9]],
   [3, 8, 6, [1, 4], [1, 4, 7, 9], [7, 9], [1, 4, 7, 9], 5, 2],
   [5, [2, 4, 7, 9], [1, 2, 4, 7], [1, 4, 6, 8], [1, 4, 6, 7, 8, 9], 3, [1, 4, 7, 8, 9], [1, 7, 8], [1, 4, 6, 8, 9]],
   [[6, 7], 1, [3, 5, 7], [2, 5, 6], [3, 6, 7], 8, [2, 4, 5], 9, [3, 4, 5]],
   [4, [3, 5], 8, 9, [1, 3], [2, 5], 6, [1, 2, 3], 7],
   [2, [3, 5, 6, 7], 9, [1, 5, 6], [1, 3, 6, 7], 4, [1, 5, 8], [1, 3, 8], [1, 3, 5, 8]],
   [8, [2, 4, 5], [1, 2, 4, 5], 7, [4, 9], [2, 9], 3, 6, [1, 5, 9]],
   [9, [2, 5, 6, 7], [2, 5, 7], 3, [6, 8], 1, [2, 5, 7, 8], 4, [5, 8]],
   [[1, 6, 7], [2, 3, 4, 6, 7], [1, 2, 3, 4, 7], [2, 4, 6, 8], 5, [2, 6, 9], [1, 2, 7, 8, 9], [1, 2, 7, 8], [1, 8, 9]]
], Skyscraper, 'Um einen Wolkenkratzer zu entdecken, benötigen Sie zwei Reihen, in denen ein Kandidat je zweimal vorkommt. In unserem Beispiel ist dies in der vierten und achten Spalte mit der 2 der Fall. Dabei müssen zwei der Kandidaten auf einer Höhe liegen, wie in Zeile 9. Im gemeinsamen Einflussbereich der beiden anderen Kandidaten kann dieser Kandidat eliminiert werden. Dies ist so begründet, dass aufgrund der Tatsache, dass in den Reihen, in denen der Kandidat nur je zweimal vorkommt, einer dieser Kandidaten in einen der gegenüberliegenden Punkte eingetragen werden muss und einer in einen der versetzten Punkte. Daher ist deren gemeinsamer Einflussbereich sicher durch diesen Wert abgedeckt. Im Beispiel wurde der Einflussbereich der anderen beiden Felder gestreift markiert und die zu streichenden 2er rot eingefärbt.')


define('Wolkenkratzer', [
            [2, 5, 3, 9, [], [], [], 7, []],
   [4, 7, 9, [], [], [], 2, [], []],
   [6, 1, 8, 7, 2, [], 9, 5, []],
   [7, 3, [], 4, [], [], 8, [], 9],
   [[], [], [], [], [], [], 3, 4, 7],
   [9, [], [], 3, [], 7, [], 2, 5],
   [5, [], [], [], 3, 6, 7, 9, []],
   [[], 9, [], 5, 7, [], [], 3, 2],
   [3, [], 7, [], [], [], 5, [], 1]
        ], Skyscraper)
