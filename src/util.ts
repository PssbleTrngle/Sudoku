export function exists<T>(t: T | undefined | null): t is T {
    return (t ?? null) !== null;
}

export function arrayOf(i: number) {
    return new Array(i).fill(null).map((_, i) => i + 1)
}

export function arrayEqual<T>(a: T[], b: T[]) {
    return a.length === b.length && a.every((v, i) => b[i] === v)
}