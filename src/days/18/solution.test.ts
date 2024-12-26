import { describe, test, expect } from 'bun:test';
import day18 from './solution';

describe('On Day 18', () => {
	describe('part1', () => {
		test(`part1 is identity function`, () => {
			expect(day18.solveForPartOne('hello')).toBe('hello');
		});
	});

	describe('part2', () => {
		test(`part2 is identity function`, () => {
			expect(day18.solveForPartTwo('hello')).toBe('hello');
		});
	});
});
