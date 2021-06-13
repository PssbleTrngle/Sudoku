import { define } from '.'

define('X-Kette', [
   [[2, 5, 7, 8], 6, 9, [4, 8], [2, 4], 1, [2, 5, 8], 3, [2, 7, 8]],
   [[2, 7, 8], 3, 4, [6, 8, 9], 5, [2, 8, 9], [2, 6, 8, 9], 1, [2, 6, 7, 8, 9]],
   [[2, 5, 8], 1, [2, 5, 8], [6, 8, 9], 3, 7, [2, 5, 6, 8, 9], [2, 8], 4],
   [[2, 5, 8], [2, 4, 5, 8], [2, 5, 8], 3, 7, [4, 5], [1, 2, 4, 6, 8], 9, [1, 2, 6, 8]],
   [[2, 3, 9], 7, 6, 1, 8, [4, 9], [2, 3, 4], [2, 4], 5],
   [1, [4, 5, 8, 9], [3, 5, 8], 2, 6, [4, 5, 9], 7, [4, 8], [3, 8]],
   [[2, 3, 5, 8, 9], [2, 5, 8, 9], 1, 7, [2, 4, 9], [2, 3, 4, 8, 9], [2, 3, 4, 8, 9], 6, [2, 3, 8, 9]],
   [6, [2, 8, 9], 7, [4, 8, 9], [2, 4, 9], [2, 3, 4, 8, 9], [1, 2, 3, 4, 8, 9], 5, [1, 2, 3, 8, 9]],
   [4, [2, 8, 9], [2, 3, 8], 5, 1, 6, [2, 3, 8, 9], 7, [2, 3, 8, 9]],
], X-Kette, 'Um eine X-Kette zu entdecken, müssen Sie nach mehreren Einheiten suchen, die denselben Kandidaten genau zweimal enthalten. Suchen Sie nach Überschneidungen dieser Einheiten, um eine Kette aus zwei gleichen Kandidaten innerhalb einer Einheit zu erstellen. Eine solche Kette aus 3ern ist in unserem Beispiel eingezeichnet. Nun empfiehlt es sich die Kette durchzunummerieren und nach Feldern zu suchen, die im Einflussbereich einer geraden und ungeraden Zahl liegen und den untersuchten Kandidaten enthalten. Aus diesen Feldern kann der Kandidat eliminiert werden. Denn die Besonderheit einer solchen Kette ist, dass die Kandidaten abwechselnd richtig und falsch sein müssen. In unserem Beispiel haben wir Ihnen die Kandidaten solcher Felder rot eingefärbt. ')

define('X-Kette 2', [
            [3, [1,4,7,8], [4,7,8], [4,7,9], [1,4,7,9], 5, [1,6,7,9], [1,6,7,8], 2],
   [[4,5], 9, [2,4,5,7,8], [4,7], 6, [1,2,3,4,7], [1,3,5,7], [1,7,8], [3,5,7]],
   [[5], [1,2,7], 6, [7,9], [1,2,7,9], 8, [1,3,5,7,9], [1,7], 4],
   [8, [2,3,6], [2,3], 1, 5, [7], 4, 9, [3,6,7]],
   [7, 5, [2,4,9], 3, [4,9], 6, [1,2], [1,2], 8],
   [1, [3,4,6], [3,4,9], 2, [4,7,8,9], [4,7], [3,6,7], 5, [3,6,7]],
   [[4,5,9], [4,7,8], [4,5,7,8,9], 6, [2,4,7,8], [2,4,7], [2,5,7,9], 3, 1],
   [2, [4,6,7,8], [4,5,7,8,9], [4,5,7,8], 3, [1,4,7], [5,6,7,9], [4,6,7], [5,6,7,9]],
   [[4,5,6], [3,4,6,7], 1, [4,5,7], [2,4,7], 9, 8, [2,4,6,7], [5,6,7]]
        ])
