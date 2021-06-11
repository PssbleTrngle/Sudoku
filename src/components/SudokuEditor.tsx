import query from 'query-string'
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useReducer, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Hint, modifySudoku, Point, possibleValues, Sudoku as ISudoku, withPoints } from '../logic/Sudoku'
import { getSudokus } from '../logic/sudokus'
import { arrayEqual, exists } from '../util'
import Focused from './Focused'
import Hints from './Hints'
import Sudoku from './Sudoku'

const SudokuEditor: FC<{
   sudoku: ISudoku
   fillCandidates?: boolean
   onChange?: Dispatch<SetStateAction<ISudoku>>
}> = ({ onChange, sudoku, fillCandidates }) => {
   const { cells } = sudoku

   const { load } = query.parse(useLocation().search)
   useEffect(() => {
      if (withPoints(cells).some(it => it.value || it.candidates.length)) return
      const info = getSudokus().find(s => s.slug === load)
      if (info) onChange?.(info.sudoku)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [load, sudoku])

   const [focused, setFocused] = useReducer(
      (_: Point | undefined, point: Point | undefined) => {
         return point && {
            row: Math.max(0, Math.min(8, point.row)),
            col: Math.max(0, Math.min(8, point.col)),
         }
      },
      undefined
   )

   useEffect(() => {
      if (fillCandidates) {
         onChange?.(() => {
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
               ...sudoku,
               cells: sudoku.cells.map((row, y) =>
                  row.map((cell, x) => ({
                     ...cell,
                     candidates: changed.find(c => c.col === x && c.row === y)?.candidates ?? cell.candidates,
                  }))
               ),
            }
         })
      }
   }, [fillCandidates, sudoku, onChange])

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

         onChange?.(sudoku => consumers.reduce((s, consumer) => consumer(s), sudoku))
      }
   }, [hint, onChange])

   return (
      <Style id='sudoku'>
         <Sudoku {...sudoku} focused={focused} onSelect={setFocused} hint={hint} />

         {focused ? (
            <Focused {...focused} {...cells[focused.row][focused.col]} onChange={c => onChange?.(modifySudoku(focused.row, focused.col, c))} />
         ) : (
            <NoSelected>Select a Cell</NoSelected>
         )}

         <Hints {...{ sudoku }} onChange={setHint} hint={hint} onApply={applyHint} />
      </Style>
   )
}

const NoSelected = styled.p`
   grid-area: focused;
   text-align: center;
`

const Style = styled.section`
   display: grid;
   align-items: center;
   justify-content: center;
   gap: 50px;
   grid-template:
      'sudoku .'
      'sudoku focused'
      'sudoku hints'
      'sudoku .'
      / auto 350px;
`

export default SudokuEditor
