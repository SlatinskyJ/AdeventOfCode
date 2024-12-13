import { describe, test, expect } from 'bun:test';
import { Combinations } from './Combinations.ts';
import day7 from './solution';

const example =
	'190: 10 19\n' +
	'3267: 81 40 27\n' +
	'83: 17 5\n' +
	'156: 15 6\n' +
	'7290: 6 8 6 15\n' +
	'161011: 16 10 13\n' +
	'192: 17 8 14\n' +
	'21037: 9 7 18 13\n' +
	'292: 11 6 16 20';

describe('On Day 7', () => {
	describe('part1', () => {
		test(`example`, () => {
			expect(day7.solveForPartOne(example)).toBe('3749');
		});

		test('292: 11 6 16 20', () => {
			expect(new Combinations('292: 11 6 16 20').isCorrect(2)).toBe(true);
		});

		test('13416: 41 9 4 8 6', () => {
			expect(new Combinations('13416: 41 9 4 8 6').isCorrect(2)).toBe(
				false
			);
		});

		test('1202974088: 5 39 7 2 2 7 165 632 1 8', () => {
			expect(
				new Combinations(
					'1202974088: 5 39 7 2 2 7 165 632 1 8'
				).isCorrect(2)
			).toBe(true);
		});

		test('102060855978: 462 319 13 2 2 7 761 3', () => {
			expect(
				new Combinations(
					'102060855978: 462 319 13 2 2 7 761 3'
				).isCorrect(2)
			).toBe(false);
		});
	});

	describe('part2', () => {
		test(`example`, () => {
			expect(day7.solveForPartTwo(example)).toBe('11387');
		});
	});
});
