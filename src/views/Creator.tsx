import { FC, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Select } from '../components/Inputs'
import SudokuEditor from '../components/SudokuEditor'
import { useObserver } from '../Hooks'
import generator, { createEmpty } from '../logic/generator'
import solver from '../logic/solver'
import { Sudoku as ISudoku, Sudoku } from '../logic/Sudoku'
import { getSudoku, getSudokus, names } from '../logic/sudokus'

const Creator: FC = () => {
   const selections = names()
   const [selected, setSelected] = useState<string>()
   const [sudoku, setSudoku] = useState<ISudoku>(createEmpty())
   const [fillcandidates, setFillCandidates] = useState(false)

   const { generating, cancel, ...generators } = useObserver(setSudoku, {
      Generieren: generator,
      Lösen: () => solver(sudoku),
   })

   const setWithoutCandidates = useCallback((sudoku: Sudoku) => {
      setSudoku({
         ...sudoku, cells: sudoku.cells.map(r => r.map(c => ({ ...c, candidates: [] })))
      })
   }, [setSudoku])

   const load = useCallback(() => {
      if (selected) {
         const { sudoku } = getSudoku(selected)
         setWithoutCandidates(sudoku)
      }
   }, [setWithoutCandidates, selected])

   const random = useCallback(() => {
      const sudokus = getSudokus()
      const selected = sudokus[Math.floor(Math.random() * sudokus.length)]
      setWithoutCandidates(selected.sudoku)
   }, [setWithoutCandidates])

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
         <SudokuEditor loading={generating} fillCandidates={fillcandidates} sudoku={sudoku} onChange={setSudoku}>

            <Toolbar>

               <Select id='load' disabled={generating} onChange={e => setSelected(e.target.value)}>
                  <option value={''}>Sudoku auswählen...</option>
                  {selections.map(s => (
                     <option key={s} value={s}>
                        {s}
                     </option>
                  ))}
               </Select>

               <Button disabled={generating || !selected} onClick={load}>Laden</Button>
               <Button disabled={generating} onClick={random}>Zufälliges Sudoku</Button>
               <Button onClick={() => setFillCandidates(true)}>Kandidaten Ausfüllen</Button>

               <Margin />

               {Object.entries(generators).map(([k, call]) => (
                  <Button key={k} onClick={generating ? cancel : call}>
                     {generating ? 'Abbrechen' : k}
                  </Button>
               ))}

               <Margin />

               <Button onClick={copy}>Kopieren</Button>

            </Toolbar>
         </SudokuEditor>
      </>
   )
}

const Margin = styled.div`
   width: 2rem;
`

const Toolbar = styled.div`
   grid-area: toolbar;
   display: grid;
   grid-auto-flow: column;
   justify-content: center;
   padding-top: 4rem;
   align-items: center;
   gap: 0.5rem;
   justify-self: start;
`

export default Creator
