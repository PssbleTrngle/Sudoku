import React, { FC } from 'react'
import styled, { useTheme } from 'styled-components'
import { ExactPoint, numSymbols } from '../logic/Sudoku'

const Connections: FC<{
   connections?: ExactPoint[][]
}> = ({ connections = [] }) => (
   <Style>
      {connections
         .filter(c => c.length === 2)
         .map(([a, b], i) => (
            <Line key={i} from={a} to={b} />
         ))}
   </Style>
)

const Line: FC<{
   from: ExactPoint
   to: ExactPoint
}> = props => {
   const [from, to] = [props.from, props.to].map(p => {
      const at = p.at ? numSymbols.indexOf(p.at) : 4
      return {
         col: p.col + (at % 3) / 3 + 1 / 6,
         row: p.row + Math.floor(at / 3) / 3 + 1 / 6,
      }
   })

   const { highlight } = useTheme()

   return <line x1={`${from.col * (100 / 9)}%`} x2={`${to.col * (100 / 9)}%`} y1={`${from.row * (100 / 9)}%`} y2={`${to.row * (100 / 9)}%`} stroke={highlight} strokeLinecap='round' strokeWidth={2} />
}

const Style = styled.svg`
   position: absolute;
   width: 100%;
   height: 100%;
   z-index: 10000;
   pointer-events: none;
`

export default Connections
