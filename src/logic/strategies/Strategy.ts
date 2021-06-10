import { arrayOf, cross } from '../../util'
import { Blocker, CellWithPoint, Hint, ninthAt, Point, Sudoku, symbols, withPoints } from '../Sudoku'

export default abstract class Strategy {
   protected static pairs = cross(symbols)

   constructor(protected sudoku: Sudoku) {}

   abstract getName(): string

   protected cells(): CellWithPoint[] {
      return withPoints(this.sudoku.cells)
   }

   find(matcher: (cell: CellWithPoint) => boolean) {
      return this.cells().filter(c => matcher(c))
   }

   highlightGroup(group: 'col' | 'row' | 'ninth', point: Point): Partial<Hint> {
      if (group === 'col') return { highlightCols: [point.col] }
      if (group === 'row') return { highlightRows: [point.row] }
      if (group === 'ninth') return { highlightNinths: [ninthAt(point)] }
      return {}
   }

   blockingHighlights(blockers: Blocker[]): Partial<Hint> {
      return {
         highlights: blockers,
         highlightCols: blockers.filter(c => c.source.includes('col')).map(c => c.col),
         highlightRows: blockers.filter(c => c.source.includes('row')).map(c => c.row),
         highlightNinths: blockers.filter(c => c.source.includes('ninth')).map(c => ninthAt(c)),
      }
   }

   forGroups(func: (cells: CellWithPoint[], group: 'col' | 'row' | 'ninth') => Hint[]) {
      return arrayOf(9)
         .map(i => i - 1)
         .map(i => {
            const inNinth = this.find(point => ninthAt(point) === i)
            const inCol = this.find(point => point.col === i)
            const inRow = this.find(point => point.row === i)

            const groups = {
               col: inCol,
               row: inRow,
               ninth: inNinth,
            }
            return Object.entries(groups)
               .map(([source, c]) => func(c, source as any))
               .flat()
         })
         .flat()
   }

   abstract getHints(): Hint[]
}
