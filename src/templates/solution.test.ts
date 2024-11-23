import { describe, test, expect } from 'bun:test';
import day0 from './solution';

describe('On Day 0', () => {
	test(`part1 is identity function`, () => {
		expect(day0.solveForPartOne('hello')).toBe('hello');
	});
	test(`part2 is identity function`, () => {
		expect(day0.solveForPartTwo('hello')).toBe('hello');
	});
});
