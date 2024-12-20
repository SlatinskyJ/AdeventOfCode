import { describe, test, expect } from 'bun:test';
import day14 from './solution';

const example =
	'p=0,4 v=3,-3\n' +
	'p=6,3 v=-1,-3\n' +
	'p=10,3 v=-1,2\n' +
	'p=2,0 v=2,-1\n' +
	'p=0,0 v=1,3\n' +
	'p=3,0 v=-2,-2\n' +
	'p=7,6 v=-1,-3\n' +
	'p=3,0 v=-1,-2\n' +
	'p=9,3 v=2,3\n' +
	'p=7,3 v=-1,2\n' +
	'p=2,4 v=2,-3\n' +
	'p=9,5 v=-3,-3';

describe('On Day 14', () => {
	describe('part1', () => {
		test(`part1 is identity function`, () => {
			expect(day14.solveForPartOne(example, 11, 7)).toBe('12');
		});
	});

	describe.skip('part2', () => {
		test(`part2 is identity function`, () => {
			expect(day14.solveForPartTwo('hello')).toBe('hello');
		});
	});
});
