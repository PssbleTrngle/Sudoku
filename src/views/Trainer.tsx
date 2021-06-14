import { uniqBy } from 'lodash'
import { FC, useMemo } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { RouterLinkButton as Link } from '../components/Inputs'
import Title from '../components/Title'
import { getStrategies } from '../logic/strategies'
import { getSudokus } from '../logic/sudokus'
import { exists } from '../util'
import StrategyTrainer from './StrategyTrainer'

const Trainer: FC = () => {
   const { url } = useRouteMatch()

   const sudokus = useMemo(() => getSudokus().filter(s => s.strategy), [])
   const strategies = useMemo(
      () =>
         uniqBy(
            sudokus.map(s => s.strategy),
            'name'
         )
            .filter(exists)
            .sort((a, b) => {
               const [ia, ib] = [a, b].map(s => getStrategies().findIndex(it => it.name === s.id))
               return ia - ib
            }),
      [sudokus]
   )

   return (
      <>
         <Route path={`${url}/:slug`} component={StrategyTrainer} />

         <Route path={url} exact>
            <Title>Wähle eine Strategie</Title>

            <List>
               {strategies.map(strategy => (
                  <Link key={strategy.name} to={`/trainer/${strategy.slug}`}>
                     <li>{strategy.name}</li>
                  </Link>
               ))}
            </List>
         </Route>
      </>
   )
}

export const List = styled.ul`
   display: grid;
   justify-content: center;
   padding: 2rem;
   gap: 10px;
   grid-template-columns: repeat(auto-fill, 300px);
   max-width: 1400px;
   margin: 0 auto;

   li {
      padding: 3rem 0;
      text-align: center;
   }
`

export default Trainer
