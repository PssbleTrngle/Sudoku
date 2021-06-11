import { Promise } from 'bluebird'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import './assets/style/app.scss'
import Observer from './logic/generator/Observer'
import { Sudoku as ISudoku } from './logic/Sudoku'

export function usePromise<T>(func: () => T | Promise<T>, depencencies?: any[]) {
   const [get, set] = useState<T>()

   useEffect(() => {
      const p = new Promise(res =>
         window.setTimeout(
            () => Promise.resolve(func()).then(r => {
               set(r)
               res()
            }),
            0
         )
      )

      return () => p.cancel()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, depencencies)

   return get
}

export function useObserver<K extends string>(setSudoku: Dispatch<SetStateAction<ISudoku>>, generators: Record<K, () => Observer<ISudoku>>) {
   const [observer, setObserver] = useState<Observer<ISudoku>>()

   const generate = useMemo(
      () =>
         Object.entries(generators)
            .map(e => e as [string, () => Observer<ISudoku>])
            .reduce(
               (o, [k, call]) => ({
                  ...o,
                  [k]: () =>
                     setObserver(old => {
                        old?.cancel('New generation')
                        return call()
                           .subscribe(s => setSudoku(() => s))
                           .catch(e => e.message && console.error(e.message))
                           .then(() => setObserver(undefined))
                     }),
               }),
               {} as Record<K, () => void>
            ),
      [generators, setSudoku]
   )

   useEffect(() => {
      observer?.cancel('Component reloading')
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const cancel = () => observer?.cancel('Manully Cancelled')

   return { generating: !!observer, cancel, ...generate }
}