import { define } from ".";
import Swordfish from "../strategies/Swordfish";

define('Schwertfisch', [
   [[3, 6], [1, 3, 6], 2, 8, [1, 3, 6], 5, [1, 4, 6, 9], [1, 3, 4, 9], 7],
   [[3, 6, 7, 8], 9, [1, 3, 8], 2, 4, [1, 3, 6, 7], [1, 6, 8], 5, [3, 6, 8]],
   [4, [1, 3, 5, 6, 7, 8], [1, 3, 5, 8], 9, [1, 3, 6, 7], [1, 3, 6, 7], 2, [1, 3, 8], [3, 6, 8]],
   [[3, 5, 7, 8, 9], [3, 4, 5, 7, 8], 6, [3, 5, 7], [3, 5, 7], 2, [4, 5, 8, 9], [4, 7, 8, 9], 1],
   [[3, 5, 7, 9], [1, 3, 4, 5, 7], [1, 3, 4, 5, 9], [1, 3, 5, 6, 7], 8, [1, 3, 4, 6, 7, 9], [4, 5, 6, 9], 2, [4, 6, 9]],
   [[2, 5, 7, 8, 9], [1, 2, 4, 5, 7, 8], [1, 4, 5, 8, 9], [1, 5, 6, 7], [1, 5, 6, 7], [1, 4, 6, 7, 9], 3, [4, 7, 8, 9], [4, 6, 8, 9]],
   [[2, 3, 6, 9], [2, 3, 4, 6], 7, [1, 3, 6], [1, 2, 3, 6], 8, [1, 4, 9], [1, 3, 4, 9], 5],
   [[2, 3, 5, 8], [2, 3, 4, 5, 8], [3, 4, 5, 8], [1, 3, 5, 7], 9, [1, 3, 7], [1, 4, 8], 6, [2, 3, 4, 8]],
   [1, [2, 3, 5, 6, 8], [3, 5, 8, 9], 4, [2, 3, 5, 6], [3, 6], 7, [3, 8, 9], [2, 3, 8, 9]]
], Swordfish, 'Um einen Schwertfisch anzuwenden, müssen Sie nach drei Zeilen suchen, in denen ein Kandidatenwert nur in drei Spalten vorkommt. Im Beispiel sind diese Felder blau umrandet und der vorkommende Kandidatenwert ist die 4. Nun müssen Sie nach weiteren Kandidaten dieses Wertes in den drei Spalten suchen. Diese können Sie streichen, da der Wert in dreien der Schnittfelder eingetragen werden müssen. Im Beispiel sehen Sie, wie die4er in den markierten Spalten gestrichen wurden. Diese Strategie ist auch umgekehrt anwendbar für Spalten mit allen Kandidatenwerten in nur drei Spalten und dem Streichen aus drei Zeilen.')


define('Schwertfisch', [
   [[], [], [], 5, 4, 6, [], [], 9],
   [[], 2, [], [], [], [], [], [], 7],
   [[], [], 3, 9, [], [], [], [], 4],
   [9, [], 5, [], [], [], [], 7, []],
   [7, [], [], [], [], [], [], 2, []],
   [[], [], [], [], 9, 3, [], [], []],
   [[], 5, 6, [], [], 8, [], [], []],
   [[], 1, [], [], 3, 9, [], [], []],
   [[], [], [], [], [], [], 8, [], 6]
        ], Swordfish)
