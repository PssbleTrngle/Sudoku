import React, { FC } from 'react'
import '../assets/style/sudoku.scss'
import { ExactPoint, symbols } from '../logic/Sudoku'

const Connections: FC<{
   connections?: ExactPoint[][]
}> = ({ connections = [] }) => (
   <svg className='connections'>
       {connections.filter(c => c.length === 2).map(([a, b], i) =>
           <Line key={i} from={a} to={b} />
       )}
   </svg>
)

const Line: FC<{
   from: ExactPoint,
   to: ExactPoint,
}> = props => {

   const [from, to] = [props.from, props.to].map(p => {
       const at = p.at ? symbols.indexOf(p.at) : 4;
       return {
           col: p.col + at % 3 / 3 + (1 / 6),
           row: p.row + Math.floor(at / 3) / 3 + (1 / 6),
       }
   })

   return <line
       x1={`${(from.col) * (100 / 9)}%`}
       x2={`${(to.col) * (100 / 9)}%`}
       y1={`${(from.row) * (100 / 9)}%`}
       y2={`${(to.row) * (100 / 9)}%`}
       stroke='rgb(71, 157, 255)'
       strokeLinecap='round'
       strokeWidth={2}
   />
}

export default Connections