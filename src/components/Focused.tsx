import classes from 'classnames'
import React, { FC, useCallback, useEffect, useRef } from 'react'
import '../assets/style/sudoku.scss'
import { Cell as ICell, Symbol, symbols } from '../logic/Sudoku'

const Focused: FC<
   ICell & {
      onChange(c: Partial<ICell>): void
      col: number
      row: number
   }
> = ({ value, candidates, onChange, col, row }) => {
   const setValue = useCallback(
      (v?: Symbol) => {
         const value = v && symbols.includes(v) ? v : undefined
         onChange({ value, candidates: value ? candidates : [] })
      },
      [onChange, candidates]
   )

   const toggle = useCallback(
      (p: Symbol) => {
         if (candidates.includes(p)) onChange({ candidates: candidates.filter(i => i !== p) })
         else onChange({ candidates: [...candidates, p].sort() })
      },
      [onChange, candidates]
   )

   const ref = useRef<HTMLInputElement>(null)
   useEffect(() => {
      ref.current?.focus()
   }, [col, row])

   return (
      <div className='focused'>
         <div className='cell'>
            <input
               {...{ ref }}
               className='value'
               type='text'
               value={value ?? ''}
               onKeyPress={e => setValue(e.key)}
               onChange={e => {
                  if (e.target.value.length === 0) setValue(undefined)
               }}
            />
         </div>

         <div className='candidates-buttons'>
            {symbols.map(i => (
               <button disabled={!!value} onClick={() => toggle(i)} className={classes({ selected: candidates.includes(i) })} key={i}>
                  {i}
               </button>
            ))}
         </div>
      </div>
   )
}

export default Focused
