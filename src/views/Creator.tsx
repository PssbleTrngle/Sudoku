import { Spinner } from '@styled-icons/fa-solid'
import { FC, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Label, Select } from '../components/Inputs'
import SudokuEditor from '../components/SudokuEditor'
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
      Generieren: generator,
      Lösen: () => solver(sudoku),
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
         <Toolbar>
            <Label htmlFor='load'>Sudoku laden:</Label>

            <Select id='load' disabled={generating} onChange={e => setSelected(e.target.value)}>
               {selections.map(s => (
                  <option key={s} value={s}>
                     {s}
                  </option>
               ))}
            </Select>

            <Button disabled={generating} onClick={load}>Laden</Button>

            {Object.entries(generators).map(([k, call]) => (
               <Button key={k} onClick={generating ? cancel : call}>
                  {generating ? 'Abbrechen' : k}
               </Button>
            ))}

            <Button onClick={copy}>Kopieren</Button>

            <Button onClick={() => setFillCandidates(true)}>Kandidaten Ausfüllen</Button>
         </Toolbar>

         <SudokuEditor fillCandidates={fillcandidates} sudoku={sudoku} onChange={setSudoku}>
            {generating && <Loading size='15vh' />}
         </SudokuEditor>
      </>
   )
}

const Loading = styled(Spinner)`
   position: absolute;
   top: 50%;
   left: 50%;
   color: ${p => p.theme.highlight};

   @keyframes rotate {
      from { transform: translate(-50%, -50%) rotate(0deg)  }
      to { transform: translate(-50%, -50%) rotate(360deg)  }
   }
   
   animation: rotate 1s linear infinite;
`

const Toolbar = styled.div`
   display: grid;
   grid-auto-flow: column;
   justify-content: center;
   padding: 2rem;
   align-items: center;
   gap: 0.5rem;
`

export default Creator
