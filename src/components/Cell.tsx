import classes from 'classnames'
import React, { FC, useMemo } from 'react'
import '../assets/style/sudoku.scss'
import { Action, CellWithPoint, Hint, ninthAt, Symbol, symbols } from '../logic/Sudoku'

const Cell: FC<
   CellWithPoint & {
      onSelect?: () => void
      selected?: boolean
      hint?: Hint
   }
> = ({ onSelect, hint, selected, col, row, candidates, ...cell }) => {
   const actions = useMemo(() => hint?.actions.filter(a => a?.col === col && a.row === row), [hint, col, row])
   const hintValue = useMemo(() => actions?.find(a => a.type === 'value')?.value, [actions])
   const value = useMemo(() => cell.value ?? hintValue, [cell.value, hintValue])

   const highlighted = hint?.highlights?.some(c => c.row === row && c.col === col)
   const blocked = hint?.blocked?.some(c => c.row === row && c.col === col)
   const filled = hint?.highlightRows?.some(r => row === r) || hint?.highlightCols?.some(c => col === c) || hint?.highlightNinths?.some(n => ninthAt({ row, col }) === n)

   const highlightedCandidates = hint?.highlights?.find(c => c.row === row && c.col === col)?.highlightedCandidates

   return (
      <span onClick={onSelect} className={classes('cell', { selected, highlighted, blocked, filled, hint: hintValue })}>
         <span className='value'>{value}</span>
         <Candidates highlighted={highlightedCandidates} candidates={cell.value ? [] : candidates} actions={actions} />
      </span>
   )
}

const Candidates: FC<{
   candidates: Symbol[]
   actions?: Action[]
   highlighted?: Symbol[]
}> = ({ candidates, actions, highlighted }) => (
   <div className='candidates'>
      {symbols.map(i => (
         <span
            className={classes({
               crossed: actions?.some(a => a.type === 'exclude' && a.value === i),
               highlighted: highlighted?.includes(i),
            })}
            key={i}>
            {candidates.includes(i) ? i : ''}
         </span>
      ))}
   </div>
)

export default Cell
