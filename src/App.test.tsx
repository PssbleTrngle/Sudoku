import { render, screen } from '@testing-library/react'
import React from 'react'
import App from './App'

test('No hints in empty sudoku', () => {
   render(<App />)
   const text = screen.getByText(/No hints possible/i)
   expect(text).toBeInTheDocument()
})
