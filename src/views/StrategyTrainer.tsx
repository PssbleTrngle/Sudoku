import { FC, useMemo } from 'react'
import { Redirect, useParams, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { RouterLinkButton as Link } from '../components/Inputs'
import Sudoku from '../components/Sudoku'
import { getSudokus, SudokuInfo } from '../logic/sudokus'

const StrategyTrainer: FC = () => {
   const { url } = useRouteMatch()
   const { slug } = useParams<Record<string, string>>()

   const [example, ...rest] = useMemo(() => getSudokus()
      .filter(s => s.strategy?.slug === slug)
      .sort(it => it.description ? -1 : 1),
      [slug]
   )

   const strategy = useMemo(() => example?.strategy, [example])

   if (!strategy) return <Redirect to='/trainer' />

   return <Style>
      <Example {...example} />
      {rest.length > 0 && <Link to={`/creator?load=${rest[0].slug}`}>Selbst Versuchen</Link>}
   </Style>
}

const Example: FC<SudokuInfo> = ({ strategy, sudoku, description }) => {

   const [hint] = useMemo(() => strategy!.create(sudoku).getHints() ?? [], [strategy, sudoku])

   return (
      <>
         <Sudoku {...sudoku} hint={hint} />

         <h2>{strategy!.name}</h2>

         <p>{description || 'No description provided'}</p>
      </>
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

   a {
      grid-area: button;
      height: max-content;
      width: max-content;
      margin: 0 auto;
   }

   grid-template:
      'sudoku .' 200px
      'sudoku strategy'
      'sudoku description'
      'sudoku button'
      'sudoku .'
      / 1fr 300px;
`

export default StrategyTrainer
