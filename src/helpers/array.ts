/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Checks if x and y are inside of array of arrays
 * @function
 * @template T
 * @param array {T}
 * @param x {number} second index
 * @param y {number} first index
 * @returns {boolean} true if inside, false otherwise
 */
export function isInMap<T extends any[][]>(
	array: T,
	x: number,
	y: number
): boolean {
	return y >= 0 && y < array.length && x >= 0 && x < array[y].length;
}

/**
 * Return value of array[y][x], if outside the range then returns null
 * @template T
 * @param array {T}
 * @param x {number}
 * @param y {number}
 * @returns {T[0][0] | null} value of array[y][x] or null
 */
export function valueInArray<T extends any[][]>(
	array: T,
	x: number,
	y: number
): T[0][0] | null {
	if (isInMap<T>(array, x, y)) {
		return array[y][x];
	}
	return null;
}
