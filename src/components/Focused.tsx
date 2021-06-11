import { lighten, mix } from 'polished'
import React, { FC, useCallback, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { Cell as ICell, numSymbols, Symbol } from '../logic/Sudoku'
import useSymbols from '../useSymbols'
import { CellStyle } from './Cell'

const Focused: FC<
   ICell & {
      onChange(c: Partial<ICell>): void
      col: number
      row: number
   }
> = ({ value, candidates, onChange, col, row }) => {
   const { from, transform } = useSymbols()

   const setValue = useCallback(
      (v?: Symbol) => {
         const value = from(v ?? '')
         onChange({ value, candidates: value ? candidates : [] })
      },
      [onChange, candidates, from]
   )

   const toggle = useCallback(
      (p: Symbol) => {
         if (candidates.includes(p)) onChange({ candidates: candidates.filter(i => i !== p) })
         else onChange({ candidates: [...candidates, p].sort() })
      },
      [onChange, candidates]
   )

   const ref = useRef<HTMLInputElement>(null)
   useEffect(() => {
      ref.current?.focus()
   }, [col, row])

   return (
      <Style>
         <Cell>
            <input
               ref={ref}
               type='text'
               value={transform(value) ?? ''}
               onKeyPress={e => setValue(e.key)}
               onChange={e => {
                  if (e.target.value.length === 0) setValue(undefined)
               }}
            />
         </Cell>

         <ul>
            {numSymbols.map(i => (
               <Candidate key={i} disabled={!!value} onClick={() => toggle(i)} selected={candidates.includes(i)}>
                  {transform(i)}
               </Candidate>
            ))}
         </ul>
      </Style>
   )
}

const Candidate = styled.button<{ selected?: boolean }>`
   margin: 0;
   width: 2.2rem;
   text-align: center;
   padding: 0.35rem 0;
   border: none;
   outline: none;
   transition: background 0.1 ease;
   background: ${p => p.theme.cells};
   cursor: pointer;
   font-family: 'Indie Flower', cursive, sans-serif;

   &:hover {
      background: ${p => lighten(0.05, p.theme.cells)};
   }

   ${p =>
      p.selected &&
      css`
         background: ${lighten(0.1, mix(0.4, p.theme.cells, p.theme.highlight))};
      `}

   &:disabled {
      cursor: not-allowed;
   }
`

const Cell = styled.div`
   ${CellStyle};

   input {
      font-family: 'Indie Flower', cursive, sans-serif;
      color: ${p => p.theme.text};
      border: none;
      outline: none;
      text-align: center;
      font-size: 50px;
      margin: 0 auto;
      padding: 0;
      width: 100%;
   }
`

const Style = styled.div`
   grid-area: focused;
   position: relative;
   margin: 0 auto;

   ul {
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(3, auto);

      overflow: hidden;
      border-radius: 5px;
      width: fit-content;
      margin: 10px auto;
   }
`

export default Focused
