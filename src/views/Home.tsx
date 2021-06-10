import { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Creator: FC = () => {

   return (
      <>
         <h1>Sudoku Trainer</h1>

         <Buttons>

            <Link to='/creator'>
               <li>
                  Creator
               </li>
            </Link>

            <Link to='/trainer'>
               <li>
                  Trainer
               </li>
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
      font-size: 1rem;
      padding: 6.7rem 6rem;
      background: #0002;
      border-radius: 10px;
   }
`

export default Creator