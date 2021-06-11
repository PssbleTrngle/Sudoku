import { createContext, useCallback, useContext } from "react";
import { numSymbols, Symbol } from "./logic/Sudoku";

const CONTEXT = createContext<Symbol[]>(numSymbols)

export default function useSymbols() {
   const symbols = useContext(CONTEXT)

   const transform = useCallback((s?: Symbol) => symbols[numSymbols.indexOf(s ?? '')], [symbols])
   const from = useCallback((s?: Symbol) => numSymbols[symbols.indexOf(s ?? '')], [symbols])

   return { symbols, transform, from }
}

export const SymbolProvider = CONTEXT.Provider