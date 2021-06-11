import { lighten, mix } from 'polished'
import React, { FC, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { CellWithPoint, Hint, ninthAt } from '../logic/Sudoku'
import useSymbols from '../useSymbols'
import Candidates from './Candidates'

const Cell: FC<
   CellWithPoint & {
      onSelect?: () => void
      selected?: boolean
      incorrect?: boolean
      hint?: Hint
   }
> = ({ onSelect, hint, selected, col, row, candidates, incorrect, ...cell }) => {
   const { transform } = useSymbols()

   const actions = useMemo(() => hint?.actions.filter(a => a?.col === col && a.row === row), [hint, col, row])
   const hintValue = useMemo(() => actions?.find(a => a.type === 'value')?.value, [actions])
   const value = useMemo(() => cell.value ?? hintValue, [cell.value, hintValue])

   const highlighted = useMemo(() => hint?.highlights?.some(c => c.row === row && c.col === col), [col, row, hint?.highlights])
   const blocked = useMemo(() => hint?.blocked?.some(c => c.row === row && c.col === col), [col, row, hint?.blocked])
   const filled = useMemo(
      () => hint?.highlightRows?.some(r => row === r) || hint?.highlightCols?.some(c => col === c) || hint?.highlightNinths?.some(n => ninthAt({ row, col }) === n),
      [col, row, hint?.highlightCols, hint?.highlightRows, hint?.highlightNinths]
   )

   const highlightedCandidates = hint?.highlights?.find(c => c.row === row && c.col === col)?.highlightedCandidates

   return (
      <Style onClick={onSelect} {...{ selected, highlighted, blocked, filled, incorrect, hint: !!hintValue }}>
         <span>{transform(value)}</span>
         <Candidates highlighted={highlightedCandidates} candidates={cell.value ? [] : candidates} actions={actions} />
      </Style>
   )
}

export const CellStyle = css`
   position: relative;
   display: grid;
   align-items: center;

   width: 8vh;
   height: 8vh;
   font-size: calc(8vh / 2);

   text-align: center;
   padding: 5px;
   border-radius: 5px;
   background-color: ${p => p.theme.cells};
   font-family: 'Indie Flower', cursive, sans-serif;
   transition: background 0.1s ease;
`

const Style = styled.div<{
   selected?: boolean
   highlighted?: boolean
   blocked?: boolean
   filled?: boolean
   hint?: boolean
   incorrect?: boolean
}>`
   ${CellStyle};
   cursor: pointer;
   user-select: none;

   &:hover {
      background: ${p => lighten(0.08, p.theme.cells)};
   }

   ${p =>
      p.filled &&
      css`
         background: lighten(${p => p.theme.highlight}, 25%);

         &:hover {
            background: lighten(${p => p.theme.highlight}, 30%);
         }
      `}

   ${p =>
      p.blocked &&
      css`
         background-image: repeating-linear-gradient(-45deg, #0001, #0001 19%, transparent 20%, transparent 39%) !important;
      `}

   ${p =>
      p.selected &&
      css`
         background: ${p => mix(0.7, p.theme.cells, p.theme.highlight)} !important;
      `}

   ${p =>
      p.highlighted &&
      css`
         box-shadow: 0 0 0 2px ${p => p.theme.highlight};
         z-index: 9000000;
      `}

   ${p =>
      p.hint &&
      css`
         color: rgb(72, 168, 28);
      `}

   ${p =>
      p.incorrect &&
      css`
         color: red;
      `}

   &:nth-of-type(3n):not(:nth-of-type(9n)) {
      margin-right: 10px;
   }

   &:nth-of-type(27n):not(:nth-of-type(81n)) {
      margin-bottom: 10px;
   }
`

export default Cell
