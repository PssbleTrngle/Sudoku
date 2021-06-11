import { createContext, useCallback, useContext } from 'react'
import { numSymbols, Symbol } from './logic/Sudoku'

const CONTEXT = createContext<Symbol[]>(numSymbols)

export default function useSymbols() {
   const symbols = useContext(CONTEXT)

   const transform = useCallback((s?: Symbol) => symbols[numSymbols.findIndex(it => it.toLowerCase() === s?.toLowerCase())], [symbols])
   const from = useCallback((s?: Symbol) => numSymbols[symbols.findIndex(it => it.toLowerCase() === s?.toLowerCase())], [symbols])

   return { symbols, transform, from }
}

export const SymbolProvider = CONTEXT.Provider
