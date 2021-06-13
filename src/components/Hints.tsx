import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
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
   const [selectedStrat, selectStrat] = useState(-1)
   const [strategy, setStrategy] = useState<string>()
   const [hints, setHints] = useState<Array<{ hints: Hint[], strategy: string }>>()

   useEffect(() => {
      onChange?.(undefined)
      setHints(undefined)
      setStrategy(undefined)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [sudoku])

   useEffect(() => {
      if (hints && hints.length <= selectedStrat) selectStrat(-1)
   }, [hints, selectedStrat, selectStrat])

   const calculateHints = useCallback(() =>
      Strategies.getHints(sudoku).then(setHints),
      [setHints, sudoku]
   )

   const getHint = useCallback(() => {
      const strat = Math.max(0, selectedStrat)
      const selected = hints?.[strat]
      if (selected && onChange) {
         onChange(selected.hints[0])
         setStrategy(selected.strategy)
      }
   }, [hints, selectedStrat, onChange, setStrategy])

   return (
      <Style>
         {!!hints?.length ? <>
            <Select onChange={e => selectStrat(parseInt(e.target.value))}>
               <option value={-1}>Any</option>
               {hints.map(({ strategy }, i) => (
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
         </> : (hints === undefined
            ? <Button onClick={calculateHints}>Check for hints</Button>
            : <NoHints>No hints possible</NoHints>
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
