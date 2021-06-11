import { FC, useMemo } from 'react'
import { Redirect, Route, useParams, useRouteMatch } from 'react-router-dom'
import { RouterLinkButton as Link } from '../components/Inputs'
import { getSudokus } from '../logic/sudokus'
import SelectedSudoku from './SelectedSudoku'
import { List } from './Trainer'

const StrategyTrainer: FC = () => {
   const { url } = useRouteMatch()
   const { slug } = useParams<Record<string, string>>()

   const sudokus = useMemo(() => getSudokus().filter(s => s.strategy?.slug === slug), [slug])
   const strategy = useMemo(() => sudokus[0]?.strategy, [sudokus])

   if (!strategy) return <Redirect to='/trainer' />

   return (
      <>
         <Route path={`${url}/:slug`} component={SelectedSudoku} />

         <Route path={url} exact>
            <List>
               {sudokus.map(sudoku => (
                  <Link key={sudoku.name} to={`/trainer/${slug}/${sudoku.slug}`}>
                     <li>{sudoku.name}</li>
                  </Link>
               ))}
            </List>
         </Route>
      </>
   )
}

export default StrategyTrainer
