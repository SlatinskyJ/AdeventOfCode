import { describe, test, expect } from 'bun:test';
import day2 from './solution';

describe('On Day 2', () => {
	test(`isSaveReport2`, () => {
		//no errors
		// expect(day2.isSaveReport2([1, 2, 3, 4])).toBe(true);
		// expect(day2.isSaveReport2([4, 3, 2, 1])).toBe(true);
		// expect(day2.isSaveReport2([1, 4, 7, 10])).toBe(true);
		// expect(day2.isSaveReport2([10, 7, 4, 1])).toBe(true);
		//
		// //with 1 fault
		// expect(day2.isSaveReport2([10, 7, 8, 5])).toBe(true);
		// expect(day2.isSaveReport2([4, 7, 6, 9])).toBe(true);
		//
		// //faulty
		// expect(day2.isSaveReport2([9, 6, 6, 1])).toBe(false);
		// expect(day2.isSaveReport2([1, 6, 6, 9])).toBe(false);
	});
	test(`part of data`, () => {
		//part of data
		// expect(day2.isSaveReport2([29, 31, 34, 35, 38, 41, 44, 47])).toBe(true);
		// expect(day2.isSaveReport2([68, 70, 72, 73, 76, 78, 80])).toBe(true);
		// expect(day2.isSaveReport2([51, 54, 57, 57, 61, 64])).toBe(false);
		// expect(day2.isSaveReport2([93, 91, 90, 89, 86, 83, 80, 77])).toBe(true);
		// expect(day2.isSaveReport2([44, 45, 46, 48, 50, 52])).toBe(true);
		// expect(day2.isSaveReport2([71, 73, 75, 76, 79, 81, 84, 86])).toBe(true);
		//
		// expect(day2.isSaveReport2([85, 84, 82, 81, 80])).toBe(true);
		// expect(day2.isSaveReport2([96, 95, 94, 93, 91, 88, 86, 85])).toBe(true);
		// expect(day2.isSaveReport2([71, 73, 75, 77, 80, 81, 84])).toBe(true);
		// expect(day2.isSaveReport2([5, 6, 7, 10, 11, 12, 13, 14])).toBe(true);
		// expect(day2.isSaveReport2([14, 11, 8, 5, 4, 3])).toBe(true);
		//
		// expect(day2.isSaveReport2([59, 56, 55, 54, 53, 50, 47])).toBe(true);
		// expect(day2.isSaveReport2([68, 65, 62, 60, 57, 55])).toBe(true);
		// expect(day2.isSaveReport2([46, 44, 41, 38, 36, 35])).toBe(true);
		// expect(day2.isSaveReport2([42, 39, 37, 34, 31, 29, 27])).toBe(true);
		// expect(day2.isSaveReport2([41, 43, 45, 46, 47, 50, 52, 54])).toBe(true);
	});

	test('solve for part of data', () => {
		// expect(day2.solveForPartTwo('83 86 88 89 91 93 94 97')).toBe('1');
		// expect(day2.solveForPartTwo('71 68 66 64 63 60 59')).toBe('1');
		// expect(day2.solveForPartTwo('34 36 37 40 43 45')).toBe('1');
		// expect(day2.solveForPartTwo('11 14 16 17 18 21 23 24')).toBe('1');
		// expect(day2.solveForPartTwo('97 94 91 88 85 83')).toBe('1');
		//
		// expect(day2.solveForPartTwo('60 58 57 56 53 51 50 47')).toBe('1');
		// expect(day2.solveForPartTwo('21 24 26 28 30 31')).toBe('1');
		// expect(day2.solveForPartTwo('21 22 24 25 27 28 31')).toBe('1');
		// expect(day2.solveForPartTwo('98 96 94 93 90 87')).toBe('1');
		// expect(day2.solveForPartTwo('48 51 54 55 57')).toBe('1');
		//
		// expect(day2.solveForPartTwo('39 32 30 28 27 26 20')).toBe('0');
		// expect(day2.solveForPartTwo('48 48 50 51 52 56 56')).toBe('0');
		// expect(day2.solveForPartTwo('58 52 49 46 45 41 34')).toBe('0');
		// expect(day2.solveForPartTwo('94 93 91 89 89 87 85 80')).toBe('0');
		// expect(day2.solveForPartTwo('84 87 90 90 92 93')).toBe('1');
		// expect(day2.solveForPartTwo('89 83 82 85 84 82 79')).toBe('0');
		// expect(day2.solveForPartTwo('75 74 71 69 65 62')).toBe('0');
		// expect(day2.solveForPartTwo('33 26 23 22 15 11')).toBe('0');
	});

	test('examples', () => {
		// expect(day2.isSaveReport2([7, 6, 4, 2, 1])).toBe(true);
		// expect(day2.isSaveReport2([1, 2, 7, 8, 9])).toBe(false);
		// expect(day2.isSaveReport2([9, 7, 6, 2, 1])).toBe(false);
		// expect(day2.isSaveReport2([1, 3, 2, 4, 5])).toBe(true);
		// expect(day2.isSaveReport2([8, 6, 4, 4, 1])).toBe(true);
		// expect(day2.isSaveReport2([1, 3, 6, 7, 9])).toBe(true);
	});

	test('isComparisonsValid', () => {
		expect(day2.isComparisonsValid([3, 3, 2, 1])).toBe(true);
		// expect(day2.isComparisonsValid([-1, -2, -3, -1])).toBe(true);
		// expect(day2.isComparisonsValid([1, 2, 3, 2])).toBe(true);
		// expect(day2.isComparisonsValid([1, -1, 2, -3, 2, 2])).toBe(false);
		// expect(day2.isComparisonsValid([1, 2, 6, 3, 3, 3])).toBe(false);
	});

	test('isValidForError', () => {
		// expect(day2.isSaveReport2([84, 87, 90, 90, 92, 93])).toEqual(true);
		//FIXME next two
		// expect(day2.solveForPartTwo('84 83 81 78 75 73 71 65')).toBe('1');
		// expect(day2.solveForPartTwo('29 30 32 33 38 36')).toBe('1');
	});

	test('removeFaulty', () => {
		expect(day2.removeFaulty([1, 1, 1, 0])).toEqual([1, 1, 1]);
		expect(day2.removeFaulty([-1, -1, -1, 0])).toEqual([-1, -1, -1]);
		expect(day2.removeFaulty([-1, 2, -1, -1])).toEqual([1, -1, -1]);
		expect(day2.removeFaulty([-1, -1, 2])).toEqual([-1, 1]);
		expect(day2.removeFaulty([3, 3, 0, 2, 1])).toEqual([3, 3, 2, 1]);

		expect(day2.removeFaulty([-1, -2, -3, -3, -2, -2, -6])).toEqual([
			-1, -2, -3, -3, -2, -2,
		]);
	});

	test('zeroes', () => {
		expect(day2.isSaveReport2([20, 20, 20, 21, 22, 23])).toEqual(false);
	});
});
