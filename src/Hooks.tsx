import { Promise } from "bluebird";
import { useEffect, useState } from "react";

export function usePromise<T>(func:() => T | Promise<T>, depencencies?: any[]) {
    const [get, set] = useState<T>()
    
    useEffect(() => {
        const p = Promise.resolve(func())
            .then(r => set(r));

        return () => p.cancel()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, depencencies)

    return get
}