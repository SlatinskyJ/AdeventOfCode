import { describe, test, expect } from 'bun:test';
import day3 from './solution';

describe('On Day 3', () => {
	test(`example part1`, () => {
		expect(
			day3.solveForPartOne(
				'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))\n'
			)
		).toBe('161');
	});

	test(`example part2`, () => {
		expect(
			day3.solveForPartTwo(
				"xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
			)
		).toBe('48');
	});
});
