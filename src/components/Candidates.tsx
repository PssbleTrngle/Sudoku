import { mix } from 'polished'
import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { Action, numSymbols, Symbol } from '../logic/Sudoku'
import useSymbols from '../useSymbols'

const Candidates: FC<{
   candidates: Symbol[]
   actions?: Action[]
   highlighted?: Symbol[]
}> = ({ candidates, actions, highlighted }) => {
   const { transform } = useSymbols()

   return (
      <Style>
         {numSymbols.map(i => (
            <Candidate crossed={actions?.some(a => a.type === 'exclude' && a.value === i)} highlighted={highlighted?.includes(i)} key={i}>
               {candidates.includes(i) ? transform(i) : ''}
            </Candidate>
         ))}
      </Style>
   )
}

const Style = styled.div`
   position: absolute;
   padding: calc(8vh / 20);
   align-items: center;
   align-self: flex-start;
   width: 100%;
   height: 100%;
   pointer-events: none;

   display: grid;
   grid-template-columns: repeat(3, 1fr);
   grid-auto-rows: 1fr;
`

const Candidate = styled.span<{
   crossed?: boolean
   highlighted?: boolean
}>`
   position: relative;
   color: ${p => mix(0.3, p.theme.cells, p.theme.text)};
   font-weight: bold;

   ${p =>
      p.highlighted &&
      css`
         color: ${p => p.theme.highlight};
      `}

   ${p =>
      p.crossed &&
      css`
         color: red;
      `}

   font-size: calc(8vh / 6);
`

export default Candidates
