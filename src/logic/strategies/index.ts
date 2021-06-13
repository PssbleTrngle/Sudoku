import { Sudoku } from '../Sudoku'
import BRC from './BRC'
import ClonedPair from './ClonedPair'
import HiddenPair from './HiddenPair'
import HiddenSingle from './HiddenSingle'
import Kite from './Kite'
import LonelyCandidates from './LonelyCandidates'
import NakedPair from './NakedPair'
import NakedQuadruple from './NakedQuadruple'
import NakedSingle from './NakedSingle'
import NakedTriple from './NakedTriple'
import RBC from './RBC'
import ForbiddenRectangle1 from './rectangles/Type1'
import ForbiddenRectangle2 from './rectangles/Type2'
import ForbiddenRectangle4 from './rectangles/Type4'
import Skyscraper from './Skyscraper'
import Steinbutt from './Steinbutt'
import Strategy from './Strategy'
import Swordfish from './Swordfish'
import ThirdEye from './ThirdEye'
import WrongCandidates from './WrongCandidates'
import WWing from './WWing'
import XChain from './XChain'
import XWing from './XWing'
import XYWing from './XYWing'

export interface Hint {
   row: number
   col: number
   value: number
}

const strategies: (new (sudoku: Sudoku) => Strategy)[] = [
   WrongCandidates,
   LonelyCandidates,
   HiddenSingle,
   NakedSingle,
   NakedPair,
   NakedTriple,
   NakedQuadruple,
   HiddenPair,
   Steinbutt,
   Swordfish,
   Skyscraper,
   Kite,
   RBC,
   BRC,
   ForbiddenRectangle1,
   ForbiddenRectangle2,
   ForbiddenRectangle4,
   ThirdEye,
   XWing,
   XYWing,
   WWing,
   ClonedPair,
   XChain,
]

async function getHints(sudoku: Sudoku) {
   const all = await Promise.all(strategies.map(s => new s(sudoku)).map(async s => ({ hints: s.getHints().filter(h => h.actions.length > 0), strategy: s.getName() })))

   return all.filter(s => s.hints.length > 0)
}

export function getStrategies() {
   return [...strategies]
}

const Strategies = { getHints }
export default Strategies
