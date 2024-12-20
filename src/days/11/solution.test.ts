import { describe, test, expect } from 'bun:test';
import day11 from './solution';
import {
	applyRule,
	applyRules,
	createShortcut,
	getShortcut,
	getStones,
	type TStone,
} from './utils.ts';

describe('On Day 11', () => {
	describe('part1', () => {
		test(`example`, () => {
			expect(day11.solveForPartOne('125 17')).toBe('55312');
		});

		describe('utils', () => {
			test.each([
				{
					input: '123 2',
					expected: [123, 2],
				},
				{
					input: '2 3333 5 1',
					expected: [2, 3333, 5, 1],
				},
			])('getStones', ({ input, expected }) => {
				expect(getStones(input)).toEqual(expected);
			});
		});
	});

	describe('part2', () => {
		test('createShortcut', () => {
			const shortcuts = new Map();

			createShortcut(shortcuts, 2, 0, 1);
			expect(shortcuts.get(2)).toEqual([1]);

			createShortcut(shortcuts, 5, 0, 1);
			expect(shortcuts.get(5)).toEqual([1]);

			createShortcut(shortcuts, 2, 1, 2);
			expect(shortcuts.get(2)).toEqual([1, 2]);
		});

		test('getShortcut', () => {
			const shortcuts = new Map([
				[2, [1, 1]],
				[5, [1, 1, 3, 4]],
				[2222, [1, 2, 4]],
			]);

			expect(getShortcut(shortcuts, 2, 0)).toEqual(1);
			expect(getShortcut(shortcuts, 2, 1)).toEqual(1);
			expect(getShortcut(shortcuts, 5, 3)).toEqual(4);
			expect(getShortcut(shortcuts, 2222, 1)).toEqual(2);
		});

		test.each([
			{
				stone: 0,
				expected: [1, -1] as [TStone, TStone],
			},
			{
				stone: 1,
				expected: [2024, -1] as [TStone, TStone],
			},
			{
				stone: 22,
				expected: [2, 2] as [TStone, TStone],
			},
			{
				stone: 221,
				expected: [447304, -1] as [TStone, TStone],
			},
		])('applyRule', ({ stone, expected }) => {
			expect(applyRule(stone)).toEqual(expected);
		});

		test.each([
			{
				shortcuts: new Map(),
				stone: 1,
				stepsLeft: 0,
				expected: 1,
			},
			{
				shortcuts: new Map(),
				stone: 17,
				stepsLeft: 1,
				expected: 2,
			},
			{
				shortcuts: new Map(),
				stone: 17,
				stepsLeft: 2,
				expected: 2,
			},
			{
				shortcuts: new Map(),
				stone: 17,
				stepsLeft: 3,
				expected: 3,
			},
			{
				shortcuts: new Map(),
				stone: 17,
				stepsLeft: 4,
				expected: 6,
			},
			{
				shortcuts: new Map(),
				stone: 17,
				stepsLeft: 5,
				expected: 8,
			},
			{
				shortcuts: new Map(),
				stone: 17,
				stepsLeft: 6,
				expected: 15,
			},
			{
				shortcuts: new Map(),
				stone: 17,
				stepsLeft: 7,
				expected: 22,
			},
		])('applyRules', ({ shortcuts, stone, stepsLeft, expected }) => {
			// console.log(stepsLeft);
			expect(applyRules(shortcuts, stone, stepsLeft)).toEqual(expected);
		});

		test('solve example', () => {
			expect(day11.solveForPartOne('125 17', 6)).toBe('22');
		});
	});
});
