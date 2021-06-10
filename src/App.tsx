import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import './assets/style/app.scss';
import Sudoku from './components/Sudoku';
import generator, { createEmpty } from './logic/generator';
import Observer from './logic/generator/Observer';
import solver from './logic/solver';
import { Sudoku as ISudoku } from './logic/Sudoku';
import { getSudoku, names } from './logic/sudokus';

type Set<T> = Dispatch<SetStateAction<T>>
function useObserver<K extends string>(setSudoku: Set<ISudoku>, generators: Record<K, () => Observer<ISudoku>>) {

    const [observer, setObserver] = useState<Observer<ISudoku>>()

    const generate = useMemo(() => (
        Object.entries(generators)
            .map(e => e as [string, () => Observer<ISudoku>])
            .reduce((o, [k, call]) => ({
                ...o, [k]:
                    () => setObserver(old => {
                        old?.cancel('New generation')
                        return call()
                            .subscribe(s => setSudoku(() => s))
                            .catch(e => e.message && console.error(e.message))
                            .then(() => setObserver(undefined))
                    })
            }), {} as Record<K, () => void>)
    ), [generators, setSudoku])

    useEffect(() => {
        observer?.cancel('Component reloading')
    }, [])

    const cancel = () => observer?.cancel('Manully Cancelled')

    return { generating: !!observer, cancel, ...generate }
}

function App() {

    const selections = names()
    const [selected, setSelected] = useState(selections[0])
    const [sudoku, setSudoku] = useState<ISudoku>(createEmpty())
    const [fillcandidates, setFillCandidates] = useState(false)

    const { generating, cancel, ...generators } = useObserver(setSudoku, {
        generate: generator,
        solve: () => solver(sudoku)
    })

    const load = () => {
        getSudoku(selected)
            .then(s => setSudoku(s))
            .catch(e => console.error(e.message))
    }

    useEffect(() => {
        if (fillcandidates) setFillCandidates(false)
    }, [fillcandidates])

    const copy = useCallback(() => {
        const minified = sudoku.cells.map(r => `[${r.map(c => {
            if (c.value) return c.value.toString()
            else if (c.candidates) return `[${c.candidates.join(',')}]`
            else return '0'
        }).join(', ')}]`).join(',\n   ')
        navigator.clipboard.writeText(`[
            ${minified}
        ]`)
    }, [sudoku])

    return <>

        <div className='toolbar'>

            <label htmlFor='load'>Select Sudoku:</label>

            <select id='load' disabled={generating} onChange={e => setSelected(e.target.value)}>
                {selections.map(s =>
                    <option key={s} value={s}>{s}</option>
                )}
            </select>

            <button disabled={generating} onClick={load}>Load</button>

            {Object.entries(generators).map(([k, call]) =>
                <button key={k} onClick={generating ? cancel : call}>{generating ? 'Cancel' : k}</button>
            )}

            <button onClick={copy}>Copy</button>

            <button onClick={() => setFillCandidates(true)}>Fill Candidates</button>

        </div>

        <Sudoku fillcandidates={fillcandidates} sudoku={sudoku} onChange={setSudoku} />
    </>
}

export default App;
