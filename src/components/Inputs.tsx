import { lighten, mix, transparentize } from 'polished'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const InputStyle = () => css`
   padding: 0.5rem;
   background: ${p => mix(0.7, p.theme.bg, '#AAA')};
   border-radius: 0.2rem;
   color: ${p => p.theme.text};
   transition: background 0.1s ease;

   &:hover {
      background: ${p => lighten(0.03, mix(0.7, p.theme.bg, '#AAA'))};
   }

   &:focus {
      box-shadow: 0 0 0 0.15rem ${p => p.theme.highlight}, 0 0 0 0.4rem ${p => transparentize(0.8, p.theme.highlight)};
      border: none;
      outline: none;
   }
`

export const ButtonStyle = () => css`
   ${InputStyle};
   cursor: pointer;

   &:disabled {
      cursor: not-allowed;
   }
`

export const Input = styled.input`
   ${InputStyle};
`

export const Select = styled.select`
   ${InputStyle};
`

export const Button = styled.button`
   ${ButtonStyle};
`

export const LinkButton = styled.a`
   ${ButtonStyle};
   text-decoration: none;
`

export const RouterLinkButton = styled(Link)`
   ${ButtonStyle};
   text-decoration: none;
`

export const Label = styled.label`
   margin-right: 0.5rem;
`
