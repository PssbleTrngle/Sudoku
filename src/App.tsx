import React, { useState } from 'react';
import './assets/style/app.scss';
import Sudoku from './components/Sudoku';
import { read } from './logic/reader';
import { Sudoku as ISudoku } from './logic/Sudoku';
import { config } from 'bluebird'
config({ cancellation: true })

function App() {

    const selections = ['1']
    const [selected, setSelected] = useState(selections[0])
    const [sudoku, setSudoku] = useState<ISudoku>()

    const load = () => {
        read(selected)
            .then(s => setSudoku(s))
            .catch(e => console.error(e.message))
    }

    return <>

        <select onChange={e => setSelected(e.target.value)}>
            {selections.map(s =>
                <option key={s} value={s}>{s}</option>
            )}
        </select>

        <button onClick={load}>Load</button>

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
