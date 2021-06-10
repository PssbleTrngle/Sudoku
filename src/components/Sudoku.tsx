import { Dispatch, FC, SetStateAction, useCallback, useEffect, useReducer, useState } from 'react'
import '../assets/style/sudoku.scss'
import { Hint, modifySudoku, Point, possibleValues, Sudoku as ISudoku, withPoints } from '../logic/Sudoku'
import { arrayEqual, exists } from '../util'
import Cell from './Cell'
import Connections from './Connections'
import Focused from './Focused'
import Hints from './Hints'


const Sudoku: FC<{
   sudoku: ISudoku
   fillcandidates?: boolean
   onChange: Dispatch<SetStateAction<ISudoku>>
}> = ({ onChange, sudoku, fillcandidates }) => {
   const { cells } = sudoku
   const [focused, setFocused] = useReducer(
      (_: Point, { row, col }: Point) => {
         return {
            row: Math.max(0, Math.min(8, row)),
            col: Math.max(0, Math.min(8, col)),
         }
      },
      { row: 0, col: 0 }
   )

   useEffect(() => {
      if (fillcandidates) {
         onChange(() => {
            const changed = withPoints(sudoku.cells)
               .map(c => {
                  if (c.value) return null
                  const candidates = possibleValues(c, sudoku)
                  if (arrayEqual(candidates, c.candidates)) return null
                  return { ...c, candidates }
               })
               .filter(exists)

            if (changed.length === 0) return sudoku

            return {
               cells: sudoku.cells.map((row, y) =>
                  row.map((cell, x) => ({
                     ...cell,
                     candidates: changed.find(c => c.col === x && c.row === y)?.candidates ?? cell.candidates,
                  }))
               ),
            }
         })
      }
   }, [fillcandidates, sudoku, onChange])

   const [hint, setHint] = useState<Hint>()

   const onKey = useCallback(
      (e: KeyboardEvent) => {
         if (focused) {
            switch (e.key) {
               case 'ArrowLeft':
                  return setFocused({ ...focused, col: e.shiftKey ? 0 : focused.col - 1 })
               case 'ArrowRight':
                  return setFocused({ ...focused, col: e.shiftKey ? 8 : focused.col + 1 })
               case 'ArrowUp':
                  return setFocused({ ...focused, row: e.shiftKey ? 0 : focused.row - 1 })
               case 'ArrowDown':
                  return setFocused({ ...focused, row: e.shiftKey ? 8 : focused.row + 1 })
            }
         }
      },
      [focused]
   )

   useEffect(() => {
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
   }, [onKey])

   const applyHint = useCallback(() => {
      if (hint) {
         const consumers = hint.actions.map(action =>
            modifySudoku(action.row, action.col, c => {
               if (action.type === 'exclude') return { candidates: c.candidates?.filter(i => action.value !== i) }
               if (action.type === 'value') return { value: action.value }
               return {}
            })
         )

         onChange(sudoku => consumers.reduce((s, consumer) => consumer(s), sudoku))
      }
   }, [hint, onChange])

   return (
      <section id='sudoku'>
         <div className='sudoku'>
            {cells.map((r, row) =>
               r.map((cell, col) => (
                  <Cell {...cell} col={col} row={row} selected={focused.col === col && focused.row === row} key={`${col}/${row}`} onSelect={() => setFocused({ col, row })} hint={hint} />
               ))
            )}

            <Connections connections={hint?.connections} />
         </div>

         {focused ? (
            <Focused col={focused.col} row={focused.row} {...cells[focused.row][focused.col]} onChange={c => onChange(modifySudoku(focused.row, focused.col, c))} />
         ) : (
            <p className='focused'>Select a Cell</p>
         )}

         <Hints {...{ sudoku }} onChange={setHint} hint={hint} onApply={applyHint} />
      </section>
   )
}

export default Sudoku
