import { FC, useCallback, useEffect, useState } from 'react'
import Sudoku from '../components/Sudoku'
import { useObserver } from '../Hooks'
import generator, { createEmpty } from '../logic/generator'
import solver from '../logic/solver'
import { Sudoku as ISudoku } from '../logic/Sudoku'
import { getSudoku, names } from '../logic/sudokus'

const Creator: FC = () => {

   const selections = names()
   const [selected, setSelected] = useState(selections[0])
   const [sudoku, setSudoku] = useState<ISudoku>(createEmpty())
   const [fillcandidates, setFillCandidates] = useState(false)

   const { generating, cancel, ...generators } = useObserver(setSudoku, {
      generate: generator,
      solve: () => solver(sudoku),
   })

   const load = () => {
      getSudoku(selected)
         .then(s => setSudoku(s.sudoku))
         .catch(e => console.error(e.message))
   }

   useEffect(() => {
      if (fillcandidates) setFillCandidates(false)
   }, [fillcandidates])

   const copy = useCallback(() => {
      const minified = sudoku.cells
         .map(
            r =>
               `[${r
                  .map(c => {
                     if (c.value) return c.value.toString()
                     else if (c.candidates) return `[${c.candidates.join(',')}]`
                     else return '0'
                  })
                  .join(', ')}]`
         )
         .join(',\n   ')
      navigator.clipboard.writeText(`[
            ${minified}
        ]`)
   }, [sudoku])

   return (
      <>
         <div className='toolbar'>
            <label htmlFor='load'>Select Sudoku:</label>

            <select id='load' disabled={generating} onChange={e => setSelected(e.target.value)}>
               {selections.map(s => (
                  <option key={s} value={s}>
                     {s}
                  </option>
               ))}
            </select>

            <button disabled={generating} onClick={load}>
               Load
            </button>

            {Object.entries(generators).map(([k, call]) => (
               <button key={k} onClick={generating ? cancel : call}>
                  {generating ? 'Cancel' : k}
               </button>
            ))}

            <button onClick={copy}>Copy</button>

            <button onClick={() => setFillCandidates(true)}>Fill Candidates</button>
         </div>

         <Sudoku fillcandidates={fillcandidates} sudoku={sudoku} onChange={setSudoku} />
      </>
   )
}

export default Creator