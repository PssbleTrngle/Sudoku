import { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react'
import '../assets/style/sudoku.scss'
import { usePromise } from '../Hooks'
import Strategies from '../logic/strategies'
import { Hint, Sudoku as ISudoku } from '../logic/Sudoku'

const Hints: FC<{
   sudoku: ISudoku
   onChange?: Dispatch<SetStateAction<Hint | undefined>>
   hint?: Hint
   onApply: () => void
}> = ({ onChange, sudoku, hint, onApply }) => {
   const loadingStrats = usePromise(() => Strategies.getHints(sudoku), [sudoku])
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

   if (strats.length === 0) return <p className='hints'>No hints possible</p>

   return (
      <div className='hints'>
         <select onChange={e => selectStrat(parseInt(e.target.value))}>
            <option value={-1}>Any</option>
            {strats.map(({ strategy }, i) => (
               <option value={i} key={i}>
                  {strategy}
               </option>
            ))}
         </select>

         <button onClick={getHint}>Get a hint</button>

         {hint && (
            <div className='info'>
               <h3>{strategy}</h3>
               <button onClick={onApply}>Apply</button>
            </div>
         )}
      </div>
   )
}

export default Hints
