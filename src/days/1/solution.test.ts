import { describe, test, expect } from 'bun:test';
import day1 from './solution';

const example =
	'3   4\n' + '4   3\n' + '2   5\n' + '1   3\n' + '3   9\n' + '3   3';

describe('On Day 1', () => {
	test(`part1 example`, () => {
		expect(day1.solveForPartOne(example)).toBe('11');
	});
	test(`part2 is identity function`, () => {
		expect(day1.solveForPartTwo('hello')).toBe('hello');
	});
});
