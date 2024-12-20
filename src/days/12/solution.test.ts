import { describe, test, expect } from 'bun:test';
import day12 from './solution';
import { isOnMap, parseInput } from './utils.ts';

const example1 = 'AAAA\n' + 'BBCD\n' + 'BBCC\n' + 'EEEC';

const example2 = 'OOOOO\n' + 'OXOXO\n' + 'OOOOO\n' + 'OXOXO\n' + 'OOOOO';

const example3 =
	'RRRRIICCFF\n' +
	'RRRRIICCCF\n' +
	'VVRRRCCFFF\n' +
	'VVRCCCJFFF\n' +
	'VVVVCJJCFE\n' +
	'VVIVCCJJEE\n' +
	'VVIIICJJEE\n' +
	'MIIIIIJJEE\n' +
	'MIIISIJEEE\n' +
	'MMMISSJEEE';

const exampleE = 'EEEEE\n' + 'EXXXX\n' + 'EEEEE\n' + 'EXXXX\n' + 'EEEEE';

describe('On Day 12', () => {
	describe.skip('part1', () => {
		describe(`solves examples`, () => {
			test(`example1`, () => {
				expect(day12.solveForPartOne(example1)).toBe('140');
			});
			test(`example2`, () => {
				expect(day12.solveForPartOne(example2)).toBe('772');
			});
			test(`example3`, () => {
				expect(day12.solveForPartOne(example3)).toBe('1930');
			});
		});

		test.each([
			{
				x: 0,
				y: 0,
				expected: true,
			},
			{
				x: -1,
				y: 0,
				expected: false,
			},
			{
				x: 0,
				y: 3,
				expected: true,
			},
			{
				x: 0,
				y: 4,
				expected: false,
			},
		])('isOnMap', ({ x, y, expected }) => {
			const map = parseInput(example1);

			expect(isOnMap(map, x, y)).toBe(expected);
		});
	});

	describe('part2', () => {
		test(`example1`, () => {
			expect(day12.solveForPartTwo(example1)).toBe('80');
		});
		test(`example2`, () => {
			expect(day12.solveForPartTwo(example1)).toBe('436');
		});
		test(`example3`, () => {
			expect(day12.solveForPartTwo(example1)).toBe('1206');
		});
		test(`exampleE`, () => {
			expect(day12.solveForPartTwo(exampleE)).toBe('1206');
		});
	});
});
