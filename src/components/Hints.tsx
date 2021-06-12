import { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { usePromise } from '../Hooks'
import Strategies from '../logic/strategies'
import { Hint, Sudoku as ISudoku } from '../logic/Sudoku'
import { Button, Select } from './Inputs'

const Hints: FC<{
   sudoku: ISudoku
   onChange?: Dispatch<SetStateAction<Hint | undefined>>
   hint?: Hint
   onApply: () => void
   paused?: boolean
}> = ({ onChange, sudoku, hint, onApply, paused }) => {
   const loadingStrats = usePromise(() => paused ? [] : Strategies.getHints(sudoku), [sudoku, paused])
   const strats = useMemo(() => loadingStrats ?? [], [loadingStrats])
   const [selectedStrat, selectStrat] = useState(-1)
   const [strategy, setStrategy] = useState<string>()

   useEffect(() => {
      if (onChange) onChange(undefined)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [sudoku])

   useEffect(() => {
      if (strats.length <= selectedStrat) selectStrat(-1)
   }, [strats, selectedStrat, selectStrat])

   const getHint = () => {
      const strat = Math.max(0, selectedStrat)
      const [hint] = strats[strat]?.hints ?? []
      if (hint && onChange) {
         onChange(hint)
         setStrategy(strats[strat].strategy)
      }
   }

   if (strats.length === 0) return <NoHints>No hints possible</NoHints>

   return (
      <Style>
         <Select onChange={e => selectStrat(parseInt(e.target.value))}>
            <option value={-1}>Any</option>
            {strats.map(({ strategy }, i) => (
               <option value={i} key={i}>
                  {strategy}
               </option>
            ))}
         </Select>

         <Button onClick={getHint}>Get a hint</Button>

         {hint && (
            <Info>
               <h3>{strategy}</h3>
               <Button onClick={onApply}>Apply</Button>
            </Info>
         )}
      </Style>
   )
}

const NoHints = styled.p`
   grid-area: hints;
   text-align: center;
`

const Info = styled.div`
   padding: 20px 0;
   display: grid;
   align-items: center;
   gap: 0.5rem;
   grid-template:
      'name apply'
      'desc desc';
`

const Style = styled.div`
   grid-area: hints;
   margin: 0 auto;

   & > button {
      margin-left: 0.5rem;
   }
`

export default Hints
