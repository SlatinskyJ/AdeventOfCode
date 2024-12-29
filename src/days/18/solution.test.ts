import { describe, test, expect } from 'bun:test';
import day18 from './solution';

const example =
	'5,4\n' +
	'4,2\n' +
	'4,5\n' +
	'3,0\n' +
	'2,1\n' +
	'6,3\n' +
	'2,4\n' +
	'1,5\n' +
	'0,6\n' +
	'3,3\n' +
	'2,6\n' +
	'5,1\n' +
	'1,2\n' +
	'5,5\n' +
	'2,5\n' +
	'6,5\n' +
	'1,4\n' +
	'0,4\n' +
	'6,4\n' +
	'1,1\n' +
	'6,1\n' +
	'1,0\n' +
	'0,5\n' +
	'1,6\n' +
	'2,0';

describe('On Day 18', () => {
	describe('part1', () => {
		test(`solves example`, () => {
			expect(day18.solveForPartOne(example, 7, 12)).toBe('22');
		});
	});

	describe.skip('part2', () => {
		test(`part2 is identity function`, () => {
			expect(day18.solveForPartTwo('hello')).toBe('hello');
		});
	});
});
