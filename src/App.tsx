import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import './assets/style/app.scss';
import Sudoku from './components/Sudoku';
import generator, { createEmpty } from './logic/generator';
import Observer from './logic/generator/Observer';
import { read } from './logic/reader';
import solver from './logic/solver';
import { Sudoku as ISudoku } from './logic/Sudoku';

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

    const selections = ['1']
    const [selected, setSelected] = useState(selections[0])
    const [sudoku, setSudoku] = useState<ISudoku>(createEmpty())

    const { generating, cancel, ...generators } = useObserver(setSudoku, {
        generate: generator,
        solve: () => solver(sudoku)
    })

    const load = () => {
        read(selected)
            .then(s => setSudoku(s))
            .catch(e => console.error(e.message))
    }

    return <>

        <select disabled={generating} onChange={e => setSelected(e.target.value)}>
            {selections.map(s =>
                <option key={s} value={s}>{s}</option>
            )}
        </select>

        <button disabled={generating} onClick={load}>Load</button>

        {Object.entries(generators).map(([k, call]) =>
            <button key={k} onClick={generating ? cancel : call}>{generating ? 'Cancel' : k}</button>
        )}

        {sudoku
            ? <Sudoku {...{ sudoku }} onChange={s => setSudoku(o => {
                const set = typeof s === 'function' ? s : () => s
                return set(o)
            })} />
            : <p>No sudoku loaded</p>
        }
    </>
}

export default App;
