import { describe, test, expect } from 'bun:test';
import day17 from './solution';

const example =
	'Register A: 729\n' +
	'Register B: 0\n' +
	'Register C: 0\n' +
	'\n' +
	'Program: 0,1,5,4,3,0';

const example2 =
	'Register A: 2024\n' +
	'Register B: 0\n' +
	'Register C: 0\n' +
	'\n' +
	'Program: 0,3,5,4,3,0';

describe('On Day 17', () => {
	describe('part1', () => {
		test(`solve example`, () => {
			expect(day17.solveForPartOne(example)).toBe('4,6,3,5,6,3,5,2,1,0');
		});
	});

	describe.only('part2', () => {
		test(`solves example2`, () => {
			expect(day17.solveForPartTwo(example2)).toBe('117440');
		});
	});
});
