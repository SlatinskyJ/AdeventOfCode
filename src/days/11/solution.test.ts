import { describe, test, expect } from 'bun:test';
import day11 from './solution';
import { alwaysRule, applyRules, baseRule, evenRule, getStones } from './utils.ts';

describe('On Day 11', () => {
	describe('part1', () => {
		test(`example`, () => {
			expect(day11.solveForPartOne('125 17', 25)).toBe('55312');
		});

		describe('rules', () => {
			test.each([{
				input: 123,
				expected: [false, [123]] as [boolean, number[]],
			}, {
				input: 1234,
				expected: [true, [12, 34]] as [boolean, number[]],
			}])('evenRule', ({ input, expected }) => {
				expect(evenRule(input)).toEqual(expected);
			});

			test.each([{
				input: 1,
				expected: [false, [1]] as [boolean, number[]],
			}, {
				input: 0,
				expected: [true, [1]] as [boolean, number[]],
			}])('baseRule', ({ input, expected }) => {
				expect(baseRule(input)).toEqual(expected);
			});

			test.each([{
				input: 1,
				expected: [true, [2024]] as [boolean, number[]],
			}, {
				input: 2,
				expected: [true, [4048]] as [boolean, number[]],
			}])('alwaysRule', ({ input, expected }) => {
				expect(alwaysRule(input)).toEqual(expected);
			});
		});

		describe('rules runner', () => {
			const rules = [baseRule, evenRule, alwaysRule];

			test.each([{
				input: 0,
				expected: [1],
			}, {
				input: 1,
				expected: [2024],
			}, {
				input: 22,
				expected: [2, 2],
			}])('applyRules', ({ input, expected }) => {
				expect(applyRules(input, new Map, ...rules)).toEqual(expected);
			});
		});

		describe('utils', () => {
			test.each([{
				input: '123 2',
				expected: [123, 2],
			}, {
				input: '2 3333 5 1',
				expected: [2, 3333, 5, 1],
			}])('getStones', ({ input, expected }) => {
				expect(getStones(input)).toEqual(expected);
			});
		});
	});
});
