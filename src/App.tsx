import { Github } from '@styled-icons/fa-brands'
import { Moon, Random, Sun } from '@styled-icons/fa-solid'
import { FC, useReducer } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import './assets/style/app.scss'
import darkTheme from './assets/themes/dark'
import defaultTheme from './assets/themes/default'
import { Button, LinkButton } from './components/Inputs'
import Nav from './components/Nav'
import { numSymbols, Symbol } from './logic/Sudoku'
import { SymbolProvider } from './useSymbols'
import Creator from './views/Creator'
import Home from './views/Home'
import Trainer from './views/Trainer'

const SYMBOLS: Symbol[][] = [numSymbols, 'ABCDEFGHI'.split(''), ['🍆', '😎', '🌺', '✨', '💎', '🍪', '🤣', '💥', '🍀']]

const App: FC = () => {
   const [dark, toggleDark] = useReducer((v: boolean) => {
      localStorage.setItem('darkmode', `${!v}`)
      return !v
   }, localStorage.getItem('darkmode') === 'true')

   const [symbols, cycleSymbols] = useReducer((s: Symbol[]) => {
      const i = (SYMBOLS.indexOf(s) + 1) % SYMBOLS.length
      localStorage.setItem('symbols', `${i}`)
      return SYMBOLS[i] ?? SYMBOLS[0]
   }, SYMBOLS[Number.parseInt(localStorage.getItem('symbols') ?? '')] ?? SYMBOLS[0])

   return (
      <ThemeProvider theme={dark ? darkTheme : defaultTheme}>
         <SymbolProvider value={symbols}>
            <Global />
            <Router>

               <Nav />

               <ButtonBar>
                  <LinkButton rel='noopener noreferrer' target='_blank' href='https://github.com/PssbleTrngle/Sudoku'>
                     <Github size='1rem' />
                  </LinkButton>
                  <Button onClick={toggleDark}>{dark ? <Sun size='1rem' /> : <Moon size='1rem' />}</Button>
                  <Button onClick={cycleSymbols}><Random size='1rem' /></Button>
               </ButtonBar>

               <Switch>
                  <Route path='/' exact component={Home} />

                  <Route path='/creator' component={Creator} />

                  <Route path='/trainer' component={Trainer} />

                  <Redirect to='/' />
               </Switch>
            </Router>
         </SymbolProvider>
      </ThemeProvider>
   )
}

const ButtonBar = styled.ul`
   display: grid;
   grid-auto-flow: column;
   position: absolute;
   top: 10px;
   right: 10px;
   gap: 5px;
`

const Global = createGlobalStyle`
   body, html {
      background: ${p => p.theme.bg};
      font-family: sans-serif;
      color: ${p => p.theme.text};
   }
   
   ul {
      list-style: none;
   }
`

export default App
