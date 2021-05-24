import classes from 'classnames'
import React, { Dispatch, FC, memo, Reducer, SetStateAction, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import '../assets/style/sudoku.scss'
import { usePromise } from '../Hooks'
import Strategies from '../logic/Strategies'
import { Action, Cell as ICell, CellWithPoint, Hint, modifySudoku, ninthAt, possibleValues, Sudoku as ISudoku, withPoints } from '../logic/Sudoku'
import { arrayEqual, arrayOf, exists } from '../util'

const NUMS = arrayOf(9)

type SudokuProps = {
    sudoku: ISudoku
    fillcandidates?: boolean
    onChange: Dispatch<SetStateAction<ISudoku>>
}

type P = [number, number] | undefined
const keepInBounds: Reducer<P, P> = (_, value) => {
    return value?.map(i => Math.max(0, Math.min(8, i))) as P
}

const Sudoku = ({ onChange, sudoku, fillcandidates }: SudokuProps) => {
    const { cells } = sudoku;
    const [f, setFocused] = useReducer(keepInBounds, [0, 0])

    const [fx, fy] = f ?? []

    useEffect(() => {
        if (fillcandidates) {
            onChange(() => {

                const changed = withPoints(sudoku.cells).map(c => {

                    if (c.value) return null
                    const candidates = possibleValues(c.point, sudoku)
                    if (arrayEqual(candidates, c.candidates)) return null
                    return { ...c, candidates }

                }).filter(exists)

                if (changed.length === 0) return sudoku

                return {
                    cells: sudoku.cells.map((row, y) =>
                        row.map((cell, x) => ({
                            ...cell, candidates:
                                changed.find(c => c.point.col === x && c.point.row === y)?.candidates
                                ?? cell.candidates
                        }))
                    )
                }

            })
        }
    }, [fillcandidates, sudoku, onChange])

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

    const applyHint = useCallback(() => {
        if (hint) {
            const consumers = hint.actions.map(action =>
                modifySudoku(action.row, action.col, c => {
                    if (action.type === 'exclude') return { candidates: c.candidates?.filter(i => action.value !== i) }
                    if (action.type === 'value') return { value: action.value }
                    return {}
                })
            )

            onChange(sudoku => consumers.reduce((s, consumer) => consumer(s), sudoku))
        }
    }, [hint, onChange])

    return <section id='sudoku'>

        <div className='sudoku'>
            {cells.map((r, row) => r.map((cell, col) =>
                <Cell {...cell}
                    point={{ row, col }}
                    selected={fx === col && fy === row}
                    key={`${col}/${row}`}
                    onSelect={() => setFocused([col, row])}
                    hint={hint}
                />
            ))}
        </div>

        {(fx !== undefined && fy !== undefined)
            ? <Focused x={fx} y={fy} {...cells[fy][fx]} onChange={c => onChange(modifySudoku(fy, fx, c))} />
            : <p className='focused'>Select a Cell</p>
        }

        <Hints {...{ sudoku }} onChange={setHint} hint={hint} onApply={applyHint} />

    </section>
}

type HintProps = {
    sudoku: ISudoku,
    onChange?: Dispatch<SetStateAction<Hint | undefined>>,
    hint?: Hint,
    onApply: () => void,
}
const Hints = ({ onChange, sudoku, hint, onApply }: HintProps) => {
    const strats = usePromise(() => Strategies.getHints(sudoku), [sudoku]) ?? []
    const [selectedStrat, selectStrat] = useState(-1)
    const [strategy, setStrategy] = useState<string>()

    useEffect(() => {
        if (onChange) onChange(undefined)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sudoku])

    useEffect(() => {
        if (strats.length <= selectedStrat) selectStrat(-1)
    }, [strats, selectedStrat, selectStrat])

    const getHint = () => {
        const strat = Math.max(0, selectedStrat)
        const [hint] = strats[strat]?.hints ?? []
        if (hint && onChange) {
            onChange(hint)
            setStrategy(strats[strat].strategy)
            console.log(hint)
        }
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

        {hint && <div className='info'>
            <h3>{strategy}</h3>
            <button onClick={onApply}>Apply</button>
        </div>}

    </div>
}

type FocusedProps = ICell & {
    onChange(c: Partial<ICell>): void;
    x: number;
    y: number;
}
const Focused = memo(({ value, candidates, onChange, x, y }: FocusedProps) => {

    const setValue = useCallback((value: number) => {
        const v = Math.min(9, Math.max(1, value))
        onChange({
            value: isNaN(v) ? undefined : v,
            candidates: isNaN(v) ? candidates : [],
        })
    }, [onChange, candidates])

    const toggle = useCallback((p: number) => {
        if (candidates.includes(p))
            onChange({ candidates: candidates.filter(i => i !== p) })
        else
            onChange({ candidates: [...candidates, p].sort() })
    }, [onChange, candidates])

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

        <div className='candidates-buttons'>
            {NUMS.map(i =>
                <button
                    disabled={!!value}
                    onClick={() => toggle(i)}
                    className={classes({ selected: candidates.includes(i) })}
                    key={i}>
                    {i}
                </button>
            )}
        </div>

    </div>
});

type CellProps = CellWithPoint & {
    onSelect?: () => void;
    selected?: boolean;
    hint?: Hint,
}
const Cell = memo(({ onSelect, hint, selected, point, candidates, ...cell }: CellProps) => {
    const { row, col } = point

    const actions = useMemo(() => hint?.actions.filter(a => a?.col === col && a.row === row), [hint, col, row])
    const hintValue = useMemo(() => actions?.find(a => a.type === 'value')?.value, [actions])
    const value = useMemo(() => cell.value ?? hintValue, [cell.value, hintValue])

    const highlighted = hint?.highlights?.some(c => c.row === row && c.col === col)
    const blocked = hint?.blocked?.some(c => c.row === row && c.col === col)
    const filled = hint?.highlightRows?.some(r => row === r) || hint?.highlightCols?.some(c => col === c) || hint?.highlightNinths?.some(n => ninthAt({ row, col }) === n)

    const highlightedCandidates = hint?.highlights?.find(c => c.row === row && c.col === col)?.candidates

    return <span onClick={onSelect} className={classes('cell', { selected, highlighted, blocked, filled, hint: hintValue })}>
        <span className='value'>{value}</span>
        <Candidates highlighted={highlightedCandidates} candidates={cell.value ? [] : candidates} actions={actions} />
    </span>
})

const Candidates: FC<{
    candidates: number[]
    actions?: Action[]
    highlighted?: number[]
}> = ({ candidates, actions, highlighted }) => (
    <div className='candidates'>
        {arrayOf(9).map(i =>
            <span className={classes({
                crossed: actions?.some(a => a.type === 'exclude' && a.value === i),
                highlighted: highlighted?.includes(i)
            })} key={i}>
                {candidates.includes(i) ? i : ''}
            </span>
        )}
    </div>
)

export default Sudoku