import { define } from ".";
import Swordfish from "../strategies/Swordfish";

define('Schwertfisch', `
   0028 5  7
   09 24  5
   4  9  2  
   006  2  1
   00008  2 
   0000003
   007  8  5
   00009  6
   1  4  7
`, Swordfish, 'Um einen Schwertfisch anzuwenden, müssen Sie nach drei Zeilen suchen, in denen ein Kandidatenwert nur in drei Spalten vorkommt. Im Beispiel sind diese Felder blau umrandet und der vorkommende Kandidatenwert ist die 4. Nun müssen Sie nach weiteren Kandidaten dieses Wertes in den drei Spalten suchen. Diese können Sie streichen, da der Wert in dreien der Schnittfelder eingetragen werden müssen. Im Beispiel sehen Sie, wie die4er in den markierten Spalten gestrichen wurden. Diese Strategie ist auch umgekehrt anwendbar für Spalten mit allen Kandidatenwerten in nur drei Spalten und dem Streichen aus drei Zeilen.')
