import { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ButtonStyle } from '../components/Inputs'

const Home: FC = () => {
   return (
      <>
         <h1>Sudoku Trainer</h1>

         <Buttons>
            <Link to='/creator'>
               <li>Creator</li>
            </Link>

            <Link to='/trainer'>
               <li>Trainer</li>
            </Link>
         </Buttons>
      </>
   )
}

const Buttons = styled.ul`
   display: grid;
   grid-auto-flow: column;
   gap: 1rem;
   justify-content: center;
   list-style: none;

   li {
      ${ButtonStyle};
      font-size: 3rem;
      padding: 6rem 4rem;
      border-radius: 10px;
   }

   a {
      text-decoration: none;
   }
`

export default Home
