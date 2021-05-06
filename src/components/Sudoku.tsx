import classes from 'classnames'
import React, { Dispatch, FC, memo, Reducer, SetStateAction, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import '../assets/style/sudoku.scss'
import { usePromise } from '../Hooks'
import Strategies from '../logic/Strategies'
import { Cell as ICell, Hint, modifySudoku, ninthAt, possiblesValues, Sudoku as ISudoku, withPoints } from '../logic/Sudoku'
import { arrayEqual, arrayOf, exists } from '../util'

const NUMS = arrayOf(9)

type SudokuProps = {
    sudoku: ISudoku
    fillCanditates?: boolean
    onChange: Dispatch<SetStateAction<ISudoku>>
}

type P = [number, number] | undefined
const keepInBounds: Reducer<P, P> = (_, value) => {
    return value?.map(i => Math.max(0, Math.min(8, i))) as P
}

const Sudoku = ({ onChange, sudoku, fillCanditates }: SudokuProps) => {
    const { cells } = sudoku;
    const [f, setFocused] = useReducer(keepInBounds, [0, 0])

    const [fx, fy] = f ?? []

    useEffect(() => {
        if (fillCanditates) {
            onChange(() => {

                const changed = withPoints(sudoku.cells).map(c => {

                    if (c.value) return null
                    const possibles = possiblesValues(c.point.x, c.point.y, sudoku)
                    if (arrayEqual(possibles, c.possibles)) return null
                    return { ...c, possibles }

                }).filter(exists)

                if (changed.length === 0) return sudoku

                return {
                    cells: sudoku.cells.map((row, y) =>
                        row.map((cell, x) => ({
                            ...cell, possibles:
                                changed.find(c => c.point.x === y && c.point.y === x)?.possibles
                                ?? cell.possibles
                        }))
                    )
                }

            })
        }
    }, [fillCanditates, sudoku, onChange])

    const [hint, setHint] = useState<Hint>()

    const onKey = useCallback((e: KeyboardEvent) => {
        if (f) {
            const [x, y] = f
            switch (e.key) {
                case 'ArrowLeft': return setFocused([e.shiftKey ? 0 : x - 1, y])
                case 'ArrowRight': return setFocused([e.shiftKey ? 8 : x + 1, y])
                case 'ArrowUp': return setFocused([x, e.shiftKey ? 0 : y - 1])
                case 'ArrowDown': return setFocused([x, e.shiftKey ? 8 : y + 1])
            }
        }
    }, [f])

    useEffect(() => {
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onKey])

    return <section id='sudoku'>

        <div className='sudoku'>
            {cells.map((r, y) => r.map((cell, x) =>
                <Cell {...{ cell }}
                    selected={fx === x && fy === y}
                    highlighted={hint?.highlights?.some(c => c.row === y && c.col === x)}
                    blocked={hint?.blocked?.some(c => c.row === y && c.col === x)}
                    filled={hint?.highlightRows?.some(c => y === c) || hint?.highlightCols?.some(r => x === r) || hint?.highlightNinths?.some(n => ninthAt(y, x) === n)}
                    key={`${x}/${y}`}
                    onSelect={() => setFocused([x, y])}
                    hint={hint && hint.row === y && hint.col === x ? hint : undefined}
                />
            ))}
        </div>

        {(fx !== undefined && fy !== undefined)
            ? <Focused x={fx} y={fy} {...cells[fy][fx]} onChange={c => onChange(modifySudoku(fy, fx, c))} />
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
    blocked?: boolean;
    filled?: boolean;
    hint?: {
        value: number;
        type: Hint['type'];
    },
}
const Cell = memo(({ onSelect, cell, hint, highlighted, filled, selected, blocked }: CellProps) => {

    const hintValue = useMemo(() => hint?.type === 'value' ? hint.value : undefined, [hint])
    const value = useMemo(() => cell.value ?? hintValue, [cell, hintValue])

    return <span onClick={onSelect} className={classes('cell', { selected, highlighted, blocked, filled, hint: hintValue })}>
        <span className='value'>{value}</span>
        <Possibles possibles={value ? [] : cell.possibles} hint={hint} />
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