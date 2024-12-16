import { describe, test, expect } from 'bun:test';
import day10 from './solution';

const example =
	'89010123\n' +
	'78121874\n' +
	'87430965\n' +
	'96549874\n' +
	'45678903\n' +
	'32019012\n' +
	'01329801\n' +
	'10456732';

describe('On Day 10', () => {
	describe('part1', () => {
		test(`part1 example`, () => {
			expect(day10.solveForPartOne(example)).toBe('36');
		});
	});

	describe('part2', () => {
		test(`part2 is identity function`, () => {
			expect(day10.solveForPartTwo(example)).toBe('81');
		});
	});
});
