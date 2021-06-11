import { FC, useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Sudoku from '../components/Sudoku'
import { getSudokus } from '../logic/sudokus'

const SelectedSudoku: FC = () => {
   const { slug } = useParams<Record<string, string>>()

   const info = useMemo(() => getSudokus().find(s => s.slug === slug && !!s.strategy), [slug])
   const hints = useMemo(() => info && info.strategy!.create(info.sudoku).getHints(), [info])

   if (!info) return <Redirect to='/trainer' />

   return (
      <Style>
         <Sudoku {...info.sudoku} hint={hints?.[0]} />

         <h2>{info.strategy?.name}</h2>

         <p>{info.description || 'No description provided'}</p>
      </Style>
   )
}

const Style = styled.section`
   display: grid;
   justify-content: center;
   padding: 2rem;
   gap: 2rem;
   margin: 0 auto;
   width: min-content;
   text-align: center;

   h2 {
      grid-area: strategy;
   }

   p {
      grid-area: description;
   }

   grid-template:
      'sudoku .' 200px
      'sudoku strategy'
      'sudoku description'
      'sudoku .'
      / 1fr 300px;
`

export default SelectedSudoku
