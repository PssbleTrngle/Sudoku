import { Spinner } from '@styled-icons/fa-solid'
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'
import { Hint, modifySudoku, Point, possibleValues, Sudoku as ISudoku, withPoints } from '../logic/Sudoku'
import { arrayEqual, exists } from '../util'
import Focused from './Focused'
import Hints from './Hints'
import Sudoku from './Sudoku'

const SudokuEditor: FC<{
   sudoku: ISudoku
   fillCandidates?: boolean
   onChange?: Dispatch<SetStateAction<ISudoku>>
   loading?: boolean
}> = ({ onChange, sudoku, fillCandidates, loading, children }) => {
   const { cells } = sudoku

   const [focused, setFocused] = useReducer((_: Point | undefined, point: Point | undefined) => {
      return (
         point && {
            row: Math.max(0, Math.min(8, point.row)),
            col: Math.max(0, Math.min(8, point.col)),
         }
      )
   }, undefined)

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
            modifySudoku(action, c => {
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

         {children}

         <Sudoku {...sudoku} focused={focused} onSelect={setFocused} hint={hint}>
            {loading && <Loading size='15vh' />}
         </Sudoku>

         {focused ? <Focused {...focused} {...cells[focused.row][focused.col]} onChange={c => onChange?.(modifySudoku(focused, c))} /> : <NoSelected>Keine Zelle ausgewählt</NoSelected>}

         <Hints sudoku={sudoku} onChange={setHint} hint={hint} onApply={applyHint} />

      </Style>
   )
}

const Loading = styled(Spinner)`
   position: absolute;
   top: 50%;
   left: 50%;
   color: ${p => p.theme.highlight};

   @keyframes rotate {
      from { transform: translate(-50%, -50%) rotate(0deg)  }
      to { transform: translate(-50%, -50%) rotate(360deg)  }
   }
   
   animation: rotate 1s linear infinite;
`

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
      "toolbar toolbar"
      'sudoku .'
      'sudoku focused'
      'sudoku hints'
      'sudoku .'
      / auto 350px;
`

export default SudokuEditor
