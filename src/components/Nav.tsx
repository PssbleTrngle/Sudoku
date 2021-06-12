import { Brain, Home, PencilAlt } from '@styled-icons/fa-solid';
import { } from 'lodash';
import { mix } from "polished";
import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav: FC = () => {
   return <Style>
      <Button to='/'><Home size='3rem' title='Home' /></Button>
      <Button to='/creator'><PencilAlt size='3rem' title='Creator' /></Button>
      <Button to='/trainer'>< Brain size='3rem' title='Trainer' /></Button>
   </Style>
}

const Button = styled(Link)`
   &:first-child {
      grid-area: primary
   }

   text-align: center;
   border-radius: 9999px;

   transition: color 0.1s ease;
   color: ${p => p.theme.text};

   &:hover {
      background: ${p => p.theme.highlight};
      box-shadow: 0 0 0.5rem 0.5rem ${p => p.theme.highlight};
   }
`

const Style = styled.nav`
   position: absolute;
   display: grid;
   padding: 0.5rem;
   padding-bottom: 2.5rem;
   padding-right: 2.5rem;
   grid-template:
      "primary a" 1fr
      "b c" 1fr
      / 1fr 1fr;

   gap: 1.8rem;
      
   background: ${p => mix(0.5, p.theme.bg, '#AAA')};
   
   transition: clip-path 0.1s ease;
   clip-path: circle(40% at 10% 10%);
   &:hover {
      clip-path: circle(90% at 0 0);
   }
`

export default Nav