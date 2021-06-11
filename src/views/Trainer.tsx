import { uniqBy } from 'lodash'
import { FC, useMemo } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { RouterLinkButton as Link } from '../components/Inputs'
import { getSudokus } from '../logic/sudokus'
import { exists } from '../util'
import StrategyTrainer from './StrategyTrainer'

const Trainer: FC = () => {
   const { url } = useRouteMatch()

   const sudokus = useMemo(() => getSudokus().filter(s => s.strategy), [])
   const strategies = useMemo(() => uniqBy(sudokus.map(s => s.strategy), 'name').filter(exists), [sudokus])

   return (
      <>
         <Route path={`${url}/:slug`} component={StrategyTrainer} />

         <Route path={url} exact>
            <List>
               {strategies.map(strategy =>
                  <Link key={strategy.name} to={`/trainer/${strategy.slug}`}>
                     <li>{strategy.name}</li>
                  </Link>
               )}
            </List>
         </Route>
      </>
   )
}

export const List = styled.ul`
   display: grid;
   justify-content: center;
   padding: 2rem;
   gap: 1rem;
`

export default Trainer