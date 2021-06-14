import { FC, useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { RouterLinkButton as Link } from '../components/Inputs'
import Sudoku from '../components/Sudoku'
import { getSudokus, SudokuInfo } from '../logic/sudokus'

const StrategyTrainer: FC = () => {
   const { slug } = useParams<Record<string, string>>()

   const [example, ...rest] = useMemo(
      () =>
         getSudokus()
            .filter(s => s.strategy?.slug === slug)
            .sort(it => (it.description ? -1 : 1)),
      [slug]
   )

   const strategy = useMemo(() => example?.strategy, [example])

   if (!strategy) return <Redirect to='/trainer' />

   return (
      <Style>
         <Example {...example} />
         {rest.length > 0 && <Link to={`/creator?load=${rest[0].slug}`}>Selbst Versuchen</Link>}
      </Style>
   )
}

const Example: FC<SudokuInfo> = ({ strategy, sudoku, description }) => {
   const [hint] = useMemo(
      () =>
         strategy!
            .create(sudoku)
            .getHints()
            .filter(h => h.actions.length > 0) ?? [],
      [strategy, sudoku]
   )

   return (
      <>
         <Sudoku {...sudoku} hint={hint} />

         <Name>{strategy!.name}</Name>

         <Description>
            {(description || 'No description provided')
               .split('\n')
               .filter(s => s.length)
               .map((line, i) => (
                  <p key={i}>{line.trim()}</p>
               ))}
         </Description>
      </>
   )
}

const Name = styled.h2`
   text-align: center;
   grid-area: strategy;
`

const Description = styled.div`
   grid-area: description;
   text-align: justify;

   p:not(:last-child) {
      margin-bottom: 1rem;
   }
`

const Style = styled.section`
   display: grid;
   justify-content: center;
   padding: 2rem;
   gap: 2rem;
   margin: 0 auto;
   width: min-content;

   a {
      grid-area: button;
      height: max-content;
      width: max-content;
      margin: 0 auto;
   }

   grid-template:
      'sudoku .'
      'sudoku strategy'
      'sudoku description'
      'sudoku button'
      'sudoku .' 400px
      / 1fr 300px;
`

export default StrategyTrainer
