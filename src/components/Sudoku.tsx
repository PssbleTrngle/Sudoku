import { mix } from 'polished'
import { Dispatch, FC } from 'react'
import styled from 'styled-components'
import { canPut, Hint, Point, Sudoku as ISudoku } from '../logic/Sudoku'
import Cell from './Cell'
import Connections from './Connections'

const Sudoku: FC<
   ISudoku & {
      hint?: Hint
      focused?: Point
      onSelect?: Dispatch<Point>
      showIncorrect?: boolean
   }
> = ({ focused, hint, onSelect, showIncorrect = true, cells, children }) => (
   <Style>
      {cells.map((r, row) =>
         r.map((cell, col) => (
            <Cell
               key={`${col}/${row}`}
               {...cell}
               incorrect={showIncorrect && !!cell.value && !canPut({ col, row }, cell.value, { cells }, true)}
               col={col}
               row={row}
               selected={focused?.col === col && focused?.row === row}
               onSelect={() => onSelect?.({ col, row })}
               hint={hint}
            />
         ))
      )}

      {children}

      <Connections connections={hint?.connections} />
   </Style>
)

const Style = styled.div`
   grid-area: sudoku;
   margin: 0 auto;

   position: relative;
   display: grid;
   grid-template-columns: repeat(9, auto);
   width: fit-content;
   height: fit-content;

   gap: 5px;

   &::after,
   &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      height: 100%;
      width: 100%;

      transform: translate(-50%, -50%);
      pointer-events: none;
      //box-shadow: 0 0 0 6px white, 0 0 0 6px white inset;
   }

   &::before {
      border-left: 2px solid ${p => mix(0.8, p.theme.cells, p.theme.bg)};
      border-right: 2px solid ${p => mix(0.8, p.theme.cells, p.theme.bg)};
      width: 34%;
   }

   &::after {
      border-top: 2px solid ${p => mix(0.8, p.theme.cells, p.theme.bg)};
      border-bottom: 2px solid ${p => mix(0.8, p.theme.cells, p.theme.bg)};
      height: 34%;
   }
`

export default Sudoku
