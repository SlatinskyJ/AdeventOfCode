import { describe, test, expect } from 'bun:test';
import day17 from './solution';

describe('On Day 17', () => {
	describe('part1', () => {
		test(`part1 is identity function`, () => {
			expect(day17.solveForPartOne('hello')).toBe('hello');
		});
	});

	describe('part2', () => {
		test(`part2 is identity function`, () => {
			expect(day17.solveForPartTwo('hello')).toBe('hello');
		});
	});
});
