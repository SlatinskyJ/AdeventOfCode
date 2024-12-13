import { describe, test, expect, beforeEach } from 'bun:test';
import day9 from './solution';
import {
	compactDisk,
	getRealRepresentation,
	swap,
	type TDisk,
} from './utils.ts';

describe('On Day 9', () => {
	const example = '2333133121414131402';
	describe('part1', () => {
		describe('example', () => {
			test(`creates correct representation`, () => {
				expect(getRealRepresentation(example)).toEqual([
					{ size: 2, id: 0 },
					{ size: 3 },
					{ size: 3, id: 1 },
					{ size: 3 },
					{ size: 1, id: 2 },
					{ size: 3 },
					{ size: 3, id: 3 },
					{ size: 1 },
					{ size: 2, id: 4 },
					{ size: 1 },
					{ size: 4, id: 5 },
					{ size: 1 },
					{ size: 4, id: 6 },
					{ size: 1 },
					{ size: 3, id: 7 },
					{ size: 1 },
					{ size: 4, id: 8 },
					{ size: 2, id: 9 },
				]);
			});

			test('compacts', () => {
				const real = getRealRepresentation(example);
				expect(compactDisk(real)).toEqual([
					{ size: 2, id: 0 },
					{ size: 2, id: 9 },
					{ size: 1, id: 8 },
					{ size: 3, id: 1 },
					{ size: 3, id: 8 },
					{ size: 1, id: 2 },
					{ size: 3, id: 7 },
					{ size: 3, id: 3 },
					{ size: 1, id: 6 },
					{ size: 2, id: 4 },
					{ size: 1, id: 6 },
					{ size: 4, id: 5 },
					{ size: 2, id: 6 },
					{ size: 14 },
				]);
			});

			test.each([
				{
					disk: [] as TDisk,
					expected: [] as TDisk,
				},
				{
					disk: [{ size: 1 }, { size: 1, id: 0 }] as TDisk,
					expected: [{ size: 1, id: 0 }, { size: 1 }] as TDisk,
				},
				{
					disk: [
						{ size: 1, id: 0 },
						{ size: 1 },
						{ size: 1, id: 1 },
					] as TDisk,
					expected: [
						{ size: 1, id: 0 },
						{ size: 1, id: 1 },
						{ size: 1 },
					] as TDisk,
				},
				{
					disk: [{ size: 1 }, { size: 2, id: 1 }] as TDisk,
					expected: [{ size: 2, id: 1 }, { size: 1 }] as TDisk,
				},
				{
					disk: [{ size: 2 }, { size: 1, id: 1 }] as TDisk,
					expected: [{ size: 1, id: 1 }, { size: 2 }] as TDisk,
				},
			])('compacts correctly', ({ disk, expected }) => {
				expect(compactDisk(disk)).toEqual(expected);
			});

			test('solves example', () => {
				expect(day9.solveForPartOne(example)).toBe('1928');
			});
		});
	});

	describe('part2', () => {
		test(`solves example`, () => {
			expect(day9.solveForPartTwo(example)).toBe('2858');
		});

		let disk: TDisk = [];
		beforeEach(() => {
			disk = [
				{ size: 2 },
				{ size: 1, id: 0 },
				{ size: 4, id: 1 },
				{ size: 2, id: 2 },
			];
		});
		test.each([
			{
				full: 1,
				empty: 0,
				expected: [
					{ size: 1, id: 0 },
					{ size: 2 },
					{ size: 4, id: 1 },
					{ size: 2, id: 2 },
				] as TDisk,
			},
			{
				full: 3,
				empty: 0,
				expected: [
					{ size: 2, id: 2 },
					{ size: 1, id: 0 },
					{ size: 4, id: 1 },
					{ size: 2 },
				] as TDisk,
			},
		])('swap', ({ full, empty, expected }) => {
			expect(swap(disk, full, empty)).toEqual(expected);
		});
	});
});
