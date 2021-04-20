import classes from 'classnames'
import React, { Dispatch, FC, memo, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import '../assets/style/sudoku.scss'
import { usePromise } from '../Hooks'
import Strategies from '../logic/Strategies'
import { Cell as ICell, Hint, modifySudoku, Sudoku as ISudoku } from '../logic/Sudoku'
import { arrayOf } from '../util'

const NUMS = arrayOf(9)

type SudokuProps = {
    sudoku: ISudoku;
    onChange: Dispatch<SetStateAction<ISudoku>>
}
const Sudoku = ({ onChange, sudoku }: SudokuProps) => {
    const { cells } = sudoku;
    const [f, setFocused] = useState<[number, number]>()
    const [fx, fy] = f ?? []

    const [hint, setHint] = useState<Hint>()

    return <section id='sudoku'>
        <div className='sudoku'>
            {cells.map((r, x) => r.map((cell, y) =>
                <Cell {...{ cell }}
                    selected={fx === x && fy === y}
                    highlighted={!!hint?.highlights?.find(c => c.row === x && c.col === y)}
                    key={`${x}/${y}`}
                    onSelect={() => setFocused([x, y])}
                    hint={hint && hint.row === x && hint.col === y ? hint : undefined}
                />
            ))}
        </div>

        {(fx !== undefined && fy !== undefined)
            ? <Focused x={fx} y={fy} {...cells[fx][fy]} onChange={c => onChange(modifySudoku(fx, fy, c))} />
            : <p className='focused'>Select a Cell</p>
        }

        <Hints {...{ sudoku }} onChange={setHint} />

    </section>
}

type HintProps = { sudoku: ISudoku, onChange?: Dispatch<SetStateAction<Hint | undefined>> }
const Hints = ({ onChange, sudoku }: HintProps) => {
    const strats = usePromise(() => Strategies.getHints(sudoku), [sudoku]) ?? []
    const [selectedStrat, selectStrat] = useState(-1)

    useEffect(() => {
        if (onChange) onChange(undefined)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sudoku])

    const getHint = () => {
        const [hint] = strats[selectedStrat]?.hints ?? strats.map(s => s.hints).reduce((a, b) => [...a, ...b], [])
        if (hint && onChange) onChange(hint)
        console.log(hint)
    }

    if (strats.length === 0) return <p className='hints'>No hints possible</p>

    return <div className='hints'>

        <select onChange={e => selectStrat(parseInt(e.target.value))}>
            <option value={-1}>Any</option>
            {strats.map(({ strategy }, i) =>
                <option value={i} key={i}>{strategy}</option>
            )}
        </select>

        <button onClick={getHint}>Get a hint</button>
    </div>
}

type FocusedProps = ICell & {
    onChange(c: Partial<ICell>): void;
    x: number;
    y: number;
}
const Focused = memo(({ value, possibles, onChange, x, y }: FocusedProps) => {

    const setValue = useCallback((value: number) => {
        const v = Math.min(9, Math.max(1, value))
        onChange({
            value: isNaN(v) ? undefined : v,
            possibles: isNaN(v) ? possibles : [],
        })
    }, [onChange, possibles])

    const toggle = useCallback((p: number) => {
        if (possibles.includes(p))
            onChange({ possibles: possibles.filter(i => i !== p) })
        else
            onChange({ possibles: [...possibles, p].sort() })
    }, [onChange, possibles])

    const ref = useRef<HTMLInputElement>(null)
    useEffect(() => {
        ref.current?.focus()
    }, [x, y])

    return <div className='focused'>

        <div className='cell'>

            <input {...{ ref }}
                className='value'
                type='text'
                value={value ?? ''}
                onKeyPress={e => {
                    const v = parseInt(e.key)
                    if (!isNaN(v)) setValue(v)
                }}
                onChange={e => {
                    if (e.target.value.length === 0) setValue(NaN)
                }}
            />
        </div>

        <div className='possibles-buttons'>
            {NUMS.map(i =>
                <button
                    disabled={!!value}
                    onClick={() => toggle(i)}
                    className={classes({ selected: possibles.includes(i) })}
                    key={i}>
                    {i}
                </button>
            )}
        </div>

    </div>
});

type CellProps = {
    cell: ICell
    onSelect?: () => void;
    selected?: boolean;
    highlighted?: boolean;
    hint?: {
        value: number;
        type: Hint['type'];
    },
}
const Cell = memo(({ onSelect, cell, hint, highlighted, selected }: CellProps) => {

    const hintValue = useMemo(() => hint?.type === 'value' ? hint.value : undefined, [hint])
    const value = useMemo(() => cell.value ?? hintValue, [cell, hintValue])

    return <span onClick={onSelect} className={classes('cell', { selected, highlighted, hint: hintValue })}>
        <span className='value'>{value}</span>
        <Possibles {...cell} hint={hint} />
    </span>
})

const Possibles: FC<{
    possibles: number[]
    hint?: CellProps['hint']
}> = ({ possibles, hint }) => (
    <div className='possibles'>
        {arrayOf(9).map(i =>
            <span className={classes({ crossed: hint?.type === 'exclude' && hint.value === i })} key={i}>
                {possibles.includes(i) ? i : ''}
            </span>
        )}
    </div>
)

export default Sudoku