import History from '../generator/History';
import { Sudoku } from "../Sudoku";

export default function solve(sudoku: Sudoku) {

   const solver = new History(sudoku)

   

   return solver.execute()

}