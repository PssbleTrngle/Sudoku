import { define } from '.'
import ForbiddenRectangle1 from '../strategies/rectangles/Type1'
import ForbiddenRectangle2 from '../strategies/rectangles/Type2'
import ForbiddenRectangle3 from '../strategies/rectangles/Type3'
import ForbiddenRectangle4 from '../strategies/rectangles/Type4'

define('Verbotenes Rechteck Typ 1', [
   [[3, 6], 7, 1, 2, 5, 8, [3, 4, 6, 9], [3, 4, 9], [3, 4, 6]],
   [[3, 6, 8], [3, 6, 9], [3, 6, 8, 9], 4, 7, 1, 2, [3, 5, 8, 9], [3, 5, 6, 8]],
   [2, 4, 5, 3, 6, 9, 7, [1, 8], [1, 8]],
   [[4, 6, 7], 5, [6, 7], 9, 1, 3, 8, 2, [4, 6]],
   [[1, 3, 4, 8], [1, 3, 9], [3, 8, 9], 5, 2, 6, [1, 3, 4], 7, [1, 3, 4]],
   [[1, 3, 6], 2, [3, 6], 8, 4, 7, [1, 3, 5, 6], [1, 3, 5], 9],
   [9, [1, 3], [3, 7], [1, 7], 8, [4, 5], [4, 5], 6, 2],
   [[1, 5, 6], 8, 2, [1, 6], 3, [4, 5], [1, 4, 5, 9], [1, 4, 5, 9], 7],
   [[1, 3, 5, 6, 7], [1, 3, 6], 4, [1, 6, 7], 9, 2, [1, 3, 5], [1, 3, 5, 8], [1, 3, 5, 8]]
], ForbiddenRectangle1, 'Um diese Strategie anzuwenden, müssen Sie nach einem sogenannten verbotenen Rechteck suchen. Im Falle von Typ 1 suchen wir nach 4 in einem Rechteck angeordneten Feldern, die alle ausschließlich dasselbe Kandidatenpaar enthalten. Lediglich in einem der vier Felder dürfen weitere Kandidaten vorkommen. Dieses Rechteck muss sich über mindestens zwei Blöcke erstrecken. In unserem Beispiel ist ein solches Rechteck mit den Kandidatenwerten 4 und 5 blau markiert. Damit das Sudoku eindeutig lösbar bleibt, können Sie das Kandidatenpaar aus dem Feld eliminieren, in dem noch weitere Kandidaten vorkommen. Im Beispiel ist dies beim rechten unter Feld des Rechtecks der Fall, weshalb darin die 4 und die 5 rot markiert sind.')

define('Verbotenes Rechteck Typ 2', [
   [[4, 6], [1, 4, 6, 9], [1, 9], 8, 3, 5, 2, 7, [1, 6]],
   [[2, 5, 6], [1, 3, 5, 6], 7, 9, 4, [2, 6], [3, 5, 6], 8, [1, 3, 5, 6]],
   [[2, 5, 6], 8, [2, 3, 5], 1, 7, [2, 6], 4, 9, [3, 5, 6]],
   [7, [6, 9], 8, 3, 2, 4, 1, 5, [6, 9]],
   [[2, 4, 5, 6], [1, 4, 5, 6, 9], [1, 2, 5, 9], 7, [6, 8], [1, 6, 9], [6, 8], 3, [4, 6, 8, 9]],
   [3, [1, 4, 6, 9], [1, 9], 5, [6, 8], [1, 6, 9], 7, 2, [4, 6, 8, 9]],
   [8, 2, 4, 6, 5, 3, 9, 1, 7],
   [1, 7, [3, 5], 4, 9, 8, [3, 5], 6, 2],
   [9, [3, 5], 6, 2, 1, 7, [3, 5, 8], 4, [3, 5, 8]]
], ForbiddenRectangle2, 'Um diese Strategie anzuwenden, müssen Sie nach einem sogenannten verbotenen Rechteck suchen. Im Falle von Typ 2 suchen wir nach 4 in einem Rechteck angeordneten Feldern, die alle dasselbe Kandidatenpaar enthalten. Dieses Rechteck muss sich über mindestens zwei Blöcke erstrecken. In zwei dieser Felder darf außerdem kein weiterer Kandidat vorkommen und in den anderen beiden muss ein weiterer Kandidat vorkommen. Dieser muss allerdings derselbe sein. Außerdem müssen die beiden Felder, mit einem weiteren Kandidaten, in einer Reihe oder einer Spalte liegen und in der Einheit, in der sie sich befinden, muss der dritte Kandidaten des Paares zusätzlich in einem weiteren Feld vorkommen. In unserem Beispiel ist ein solches Rechteck mit den Kandidatenwerten 2 und 6 blau markiert. Damit das Sudoku eindeutig lösbar bleibt, müssen Sie den dritten Wert aus allen Feldern, die in derselben Einheit, wie die beiden Felder mit drei Kandidaten liegen, eliminieren. Im Bespiel befinden sich die beiden Felder mit drei Kandidaten im linken oberen Block und in der ersten Spalte. Die 5 ist der dritte Wert, weshalb aus dem linken oberen Block und der ersten Spalte alle 5en eliminiert werden können. Diese 5en sind im Beispiel rot markiert.')

define('Verbotenes Rechteck Typ 3', [
   [9, [4, 5, 6, 8], 3, 1, [4, 5, 8], 2, [5, 8], [4, 6], 7],
   [[1, 5, 8], [1, 4, 5, 8], [5, 8], 7, [4, 5, 8], 6, 2, 3, 9],
   [2, [4, 5, 6, 8], 7, [4, 5, 9], 3, [4, 5, 8, 9], [5, 8], [4, 6], 1],
   [3, [2, 6, 8, 9], [2, 6, 8, 9], [6, 9], [6, 8, 9], 7, 1, 5, 4],
   [[1, 5, 6, 7, 8], [1, 5, 6, 8], 4, [5, 6], 2, [5, 8], 9, [7, 8], 3],
   [[5, 7, 8], [5, 8, 9], [5, 8, 9], [3, 4, 5, 9], 1, [3, 4, 5, 8, 9], 6, [7, 8], 2],
   [[4, 6, 8], 7, [6, 8, 9], 2, [4, 6, 9], [1, 4, 9], 3, [1, 9], 5],
   [[4, 5], 3, [2, 5, 9], 8, [4, 5, 9], [1, 4, 5, 9], 7, [1, 2, 9], 6],
   [[5, 6], [2, 5, 6, 9], 1, [3, 5, 6, 9], 7, [3, 5, 9], 4, [2, 9], 8]
], ForbiddenRectangle3, 'Um diese Strategie anzuwenden, müssen Sie nach einem sogenannten verbotenen Rechteck suchen. Im Falle von Typ 3 suchen wir nach 4 in einem Rechteck angeordneten Feldern, die alle dasselbe Kandidatenpaar enthalten. Dieses Rechteck muss sich über mindestens zwei Blöcke erstrecken. In zwei dieser Felder darf außerdem kein weiterer Kandidat vorkommen und in den anderen beiden müssen beliebige weitere Kandidaten vorkommen. Außerdem müssen die beiden Felder, mit weiteren Kandidaten, in einer Reihe oder einer Spalte liegen und in der Einheit, in der sie sich befinden, muss mindestens einer der zusätzlichen Kandidaten in mindestens einem weiteren Feld vorkommen. In unserem Beispiel ist ein solches Rechteck mit den Kandidatenwerten 4 und 6 blau markiert. Betrachtet werden muss die Einheit, in der sich die Felder des Rechtecks mit mehreren Kandidaten befinden. Da die Zahlen des Kandidatenpaares nicht in alle Eckfelder eingetragen werden dürfen, muss mindestens einer der zusätzlichen Kandidaten eingetragen werden. Nun müssen alle möglichen Kandidaten und deren daraus resultierenden Streichungen untersucht werden. Es wird nach einem oder mehreren Kandidaten gesucht, die bei jeder möglichen Kombination gestrichen werden können. In unserem Beispiel kann entweder die 5 oder die 8 in eines der Eckfelder eingetragen werden. Dadurch wird in das dritte Feld in der zweiten Zeile die andere der beiden Zahlen eingetragen. Daraus resultiert in jedem Fall eine Streichung der rot markierten 5 und 8 in der ersten Spalte. ')

define('Verbotenes Rechteck Typ 3 - 2', [
   [9, 4, [5, 7], [1, 8], [1, 3, 5], [1, 2, 3], [3, 5, 8], 6, [2, 7]],
   [[2, 8], 3, [2, 5], 9, 7, 6, [2, 5, 8], 4, 1],
   [[2, 7, 8], 6, 1, [4, 8], [3, 5], [2, 3, 4], [2, 3, 5, 7, 8], 9, [2, 7]],
   [6, 1, 9, 7, 2, 8, 4, 3, 5],
   [5, [2, 8], [2, 4, 7], 3, 9, [1, 4], [2, 7, 8], [1, 8], 6],
   [[2, 4, 7, 8], [2, 8], 3, [1, 4], 6, 5, [2, 7, 8], [1, 8], 9],
   [3, 5, 6, 2, 8, 9, 1, 7, 4],
   [[2, 4], 7, [2, 4], 6, [1, 3], [1, 3], 9, 5, 8],
   [1, 9, 8, 5, 4, 7, 6, 2, 3]
], ForbiddenRectangle3)

define('Verbotenes Rechteck Typ 4', [
   [[5, 8], [5, 7, 8], [3, 7, 8], [6, 7], 2, 9, [3, 6, 8], 4, 1],
   [[4, 9], 6, [3, 4], 1, 5, 8, 7, 2, [3, 9]],
   [2, [7, 8, 9], 1, [6, 7], 4, 3, [6, 8], 5, [8, 9]],
   [[4, 5, 9], [1, 4, 5, 9], [2, 4], 8, 6, [1, 5], [3, 4, 5], 7, [2, 3, 4, 5]],
   [6, [5, 7, 8], [2, 7, 8], 9, 3, 4, [5, 8], 1, [2, 5, 8]],
   [3, [1, 4, 5, 8], [4, 8], 2, 7, [1, 5], 9, 6, [4, 5, 8]],
   [1, 2, 6, 3, 8, 7, [4, 5], 9, [4, 5]],
   [[4, 8], [4, 8], 9, 5, 1, 6, 2, 3, 7],
   [7, 3, 5, 4, 9, 2, 1, 8, 6]
], ForbiddenRectangle4, 'Um diese Strategie anzuwenden, müssen Sie nach einem sogenannten verbotenen Rechteck suchen. Im Falle von Typ 4 suchen wir nach 4 in einem Rechteck angeordneten Feldern, die alle dasselbe Kandidatenpaar enthalten. Dieses Rechteck muss sich über mindestens zwei Blöcke erstrecken. In zwei dieser Felder darf außerdem kein weiterer Kandidat vorkommen und in den anderen beiden müssen beliebige weitere Kandidaten vorkommen. Außerdem müssen die beiden Felder, mit weiteren Kandidaten, in einer Reihe oder einer Spalte liegen und in der Einheit, in der sie sich befinden, darf einer der Kandidaten des Paares in keinem weiteren Feld vorkommen. In unserem Beispiel ist ein solches Rechteck mit den Kandidatenwerten 1 und 5 blau markiert. Betrachtet werden muss die Einheit, in der sich die Felder des Rechtecks mit mehreren Kandidaten befinden. Einer der beiden Kandidaten des Paares darf innerhalb der Einheit nicht mehr vorkommen und der andere muss darin vorkommen. Im Beispiel kommt in dieser Einheit keine weitere 1 vor und die 5 kommt sowohl in diesem Block als auch in dieser Zeile vor. Daher muss die 1 auf jeden Fall in eines der beiden Felder eingetragen werden. Damit das Sudoku nun eindeutig bleibt müssen Sie den Kandidaten, der in der Einheit nochmals vorkommt aus den Eckfeldern eliminieren. Im Beispiel müssen daher die beiden 5en eliminiert werden, weshalb diese rot markiert sind. ')


define('Verbotenes Rechteck Typ 4',[
   [6, [], 8, [], 7, [], [], 1, 4],
   [2, [], 9, [], [], [], [], 5, 7],
   [4, [], [], 1, 2, 3, [], [], []],
   [9, [], [], [], [], 1, 4, [], []],
   [1, [], [], 5, [], [], 9, [], []],
   [5, [], [], 8, 9, [], 6, [], []],
   [[], [], [], 2, 3, 4, [], 8, []],
   [[], 2, [], [], 5, 9, [], [], []],
   [[], 4, [], [], [], [], 5, 9, 2]
        ],ForbiddenRectangle4)
