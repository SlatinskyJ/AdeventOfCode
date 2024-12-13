import { describe, test, expect } from 'bun:test';
import day8 from './solution';
import type { TCoordinates, TMap } from './types.ts';
import {
	getAntinodesForAntennaPair,
	getResonantAntinodesForAntennaPair,
	isOnMap,
} from './utils.ts';

const example =
	'............\n' +
	'........0...\n' +
	'.....0......\n' +
	'.......0....\n' +
	'....0.......\n' +
	'......A.....\n' +
	'............\n' +
	'............\n' +
	'........A...\n' +
	'.........A..\n' +
	'............\n' +
	'............';

const exampleAs =
	'............\n' +
	'............\n' +
	'............\n' +
	'............\n' +
	'............\n' +
	'......A.....\n' +
	'............\n' +
	'............\n' +
	'........A...\n' +
	'.........A..\n' +
	'............\n' +
	'............';

const example0s =
	'............\n' +
	'........0...\n' +
	'.....0......\n' +
	'.......0....\n' +
	'....0.......\n' +
	'............\n' +
	'............\n' +
	'............\n' +
	'............\n' +
	'............\n' +
	'............\n' +
	'............';

const example2 =
	'T.........\n' +
	'...T......\n' +
	'.T........\n' +
	'..........\n' +
	'..........\n' +
	'..........\n' +
	'..........\n' +
	'..........\n' +
	'..........\n' +
	'..........';

describe('On Day 8', () => {
	describe('isOnMap', () => {
		const testMap: TMap = [
			['A', '.', '.'],
			['.', 'A', '.'],
			['.', '.', '.'],
		];

		test.each([
			{ map: testMap, coordinates: [1, 1] as TCoordinates },
			{ map: testMap, coordinates: [0, 0] as TCoordinates },
			{ map: testMap, coordinates: [2, 2] as TCoordinates },
			{ map: testMap, coordinates: [0, 2] as TCoordinates },
			{ map: testMap, coordinates: [2, 0] as TCoordinates },
		])('%coordinates is inside %map', ({ map, coordinates }) => {
			expect(isOnMap(map, coordinates)).toEqual(true);
		});

		test.each([
			{ map: testMap, coordinates: [-1, 1] as TCoordinates },
			{ map: testMap, coordinates: [1, -1] as TCoordinates },
			{ map: testMap, coordinates: [3, 1] as TCoordinates },
			{ map: testMap, coordinates: [1, 3] as TCoordinates },
			{ map: testMap, coordinates: [-1, -1] as TCoordinates },
			{ map: testMap, coordinates: [3, 3] as TCoordinates },
		])('%coordinates are NOT on %map', ({ map, coordinates }) => {
			expect(isOnMap(map, coordinates)).toEqual(false);
		});
	});

	describe('getAntinodesForAntennaPair', () => {
		test.each([
			{
				a: [5, 2] as TCoordinates,
				b: [3, 3] as TCoordinates,
				expected: [
					[7, 1],
					[1, 4],
				] as TCoordinates[],
			},
			{
				a: [2, 3] as TCoordinates,
				b: [3, 4] as TCoordinates,
				expected: [
					[1, 2],
					[4, 5],
				] as TCoordinates[],
			},
		])('returns correct pair', ({ a, b, expected }) => {
			expect(getAntinodesForAntennaPair(a, b)).toEqual(expected);
		});
	});

	describe('part1', () => {
		test(`solves exampleAs`, () => {
			expect(day8.solveForPartOne(exampleAs)).toBe('5');
		});

		test(`solves example0s`, () => {
			expect(day8.solveForPartOne(example0s)).toBe('10');
		});
		test(`solves example`, () => {
			expect(day8.solveForPartOne(example)).toBe('14');
		});
	});

	describe('part2', () => {
		test.each([
			{
				max: 2,
				a: [0, 0] as TCoordinates,
				b: [1, 1] as TCoordinates,
				expected: [
					[0, 0],
					[-1, -1],
					[-2, -2],
					[1, 1],
					[2, 2],
					[3, 3],
				] as TCoordinates[],
			},
		])('getResonantAntinodesForAntennaPair', ({ max, a, b, expected }) => {
			expect(getResonantAntinodesForAntennaPair(max, a, b)).toEqual(
				expected
			);
		});

		test(`solves example2`, () => {
			expect(day8.solveForPartTwo(example2)).toBe('9');
		});

		test(`solves example`, () => {
			expect(day8.solveForPartTwo(example)).toBe('34');
		});
	});
});
