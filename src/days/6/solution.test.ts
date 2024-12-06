import { describe, test, expect } from 'bun:test';
import day6 from './solution';

const exampleInput =
	'....#.....\n' +
	'.........#\n' +
	'..........\n' +
	'..#.......\n' +
	'.......#..\n' +
	'..........\n' +
	'.#..^.....\n' +
	'........#.\n' +
	'#.........\n' +
	'......#...';

describe('On Day 6', () => {
	test(`part1 is identity function`, () => {
		expect(day6.solveForPartOne(exampleInput)).toBe('41');
	});
});
