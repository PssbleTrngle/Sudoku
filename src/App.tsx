import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import './assets/style/app.scss'
import Creator from './views/Creator'
import Home from './views/Home'

function App() {

   return (
      <Router>
         <Switch>

            <Route path='/' exact>
               <Home />
            </Route>

            <Route path='/creator'>
               <Creator />
            </Route>

            <Route path='*'>
               <Redirect to='/' />
            </Route>

         </Switch>
      </Router>
   )
}

export default App
