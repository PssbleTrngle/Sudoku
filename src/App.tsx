import React, { useEffect, useState } from 'react';
import './assets/style/app.scss';
import Sudoku from './components/Sudoku';
import generator from './logic/generator';
import { Observer } from './logic/generator/History';
import { read } from './logic/reader';
import { Sudoku as ISudoku } from './logic/Sudoku';

function App() {

    const selections = ['1']
    const [selected, setSelected] = useState(selections[0])
    const [sudoku, setSudoku] = useState<ISudoku>()

    const load = () => {
        read(selected)
            .then(s => setSudoku(s))
            .catch(e => console.error(e.message))
    }

    const [observer, setObserver] = useState<Observer<ISudoku>>()
    const [generating, setGenerating] = useState(false)

    useEffect(() => {
        observer?.cancel('Component reloading')
    }, [])

    const generate = () => setObserver(old => {
        old?.cancel('New generation')
        setGenerating(true)
        return generator()
            .subscribe(s => setSudoku(() => s))
            .catch(e => e.message && console.error(e.message))
            .then(() => setGenerating(false))
    })

    return <>

        <select disabled={generating} onChange={e => setSelected(e.target.value)}>
            {selections.map(s =>
                <option key={s} value={s}>{s}</option>
            )}
        </select>

        <button disabled={generating} onClick={load}>Load</button>

        <button disabled={generating} onClick={generate}>Generate</button>

        {sudoku
            ? <Sudoku {...{ sudoku }} onChange={s => setSudoku(o => {
                const set = typeof s === 'function' ? s : () => s
                if (o) return set(o)
                return undefined;
            })} />
            : <p>No sudoku loaded</p>
        }
    </>
}

export default App;
