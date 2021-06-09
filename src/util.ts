/**
 * @param t The value 
 * @returns if the value is not `null` and not `undefined`
 */
export function exists<T>(t: T | undefined | null): t is T {
    return (t ?? null) !== null;
}

/**
 * @param size The size of the array
 * @returns an array of the given size filled with incrementing number starting at 1
 */
export function arrayOf(size: number) {
    return new Array(size).fill(null).map((_, i) => i + 1)
}

/**
 * @param a first array
 * @param b second array
 * @returns wether or not both arrays are equal
 */
export function arrayEqual<T>(a: T[], b: T[]) {
    return a.length === b.length && a.every((v, i) => b[i] === v)
}