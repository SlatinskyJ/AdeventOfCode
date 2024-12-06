import { describe, test, expect } from 'bun:test';
import day4 from './solution';

//10x10
const exampleInput =
	'MMMSXXMASM\n' +
	'MSAMXMSMSA\n' +
	'AMXSXMAAMM\n' +
	'MSAMASMSMX\n' +
	'XMASAMXAMM\n' +
	'XXAMMXXAMA\n' +
	'SMSMSASXSS\n' +
	'SAXAMASAAA\n' +
	'MAMMMXMMMM\n' +
	'MXMXAXMASX';

const allDirections =
	'XMASXMAS\n' +
	'SAMX....\n' +
	'XSX.SX.S\n' +
	'MA.MMAA.\n' +
	'AM.AAMM.\n' +
	'SXS.XS.X\n' +
	'SAMXXMAS\n' +
	'........';

const shouldFail =
	'........\n' +
	'........\n' +
	'........\n' +
	'........\n' +
	'........\n' +
	'........\n' +
	'........\n' +
	'........';

const allDirectionsFromOne =
	'.S..S..S\n' +
	'..A.A.A.\n' +
	'...MMM..\n' +
	'.SAMXMAS\n' +
	'...MMM..\n' +
	'..A.A.A.\n' +
	'.S..S..S\n' +
	'........';

const allDirectionsToOne =
	'.X..X..X\n' +
	'..M.M.M.\n' +
	'...AAA..\n' +
	'.XMASAMX\n' +
	'...AAA..\n' +
	'..M.M.M.\n' +
	'.X..X..X\n' +
	'........';

const overEdge =
	'........\n' +
	'........\n' +
	'........\n' +
	'......XM\n' +
	'AS......\n' +
	'........\n' +
	'........\n' +
	'........';

const exampleInput2 =
	'.M.S......\n' +
	'..A..MSMS.\n' +
	'.M.S.MAA..\n' +
	'..A.ASMSM.\n' +
	'.M.S.M....\n' +
	'..........\n' +
	'S.S.S.S.S.\n' +
	'.A.A.A.A..\n' +
	'M.M.M.M.M.\n' +
	'..........';

describe('On Day 4', () => {
	test(`part1 solve example`, () => {
		expect(day4.solveForPartOne(exampleInput)).toBe('18');
	});
	test(`part1 find all directions`, () => {
		expect(day4.solveForPartOne(allDirections)).toBe('11');
	});
	test(`part1 should be 0`, () => {
		expect(day4.solveForPartOne(shouldFail)).toBe('0');
	});
	test(`part1 all directions from one`, () => {
		expect(day4.solveForPartOne(allDirectionsFromOne)).toBe('8');
	});
	test(`part1 all directions to one`, () => {
		expect(day4.solveForPartOne(allDirectionsToOne)).toBe('8');
	});
	test(`part1 over edge`, () => {
		expect(day4.solveForPartOne(overEdge)).toBe('0');
	});
	test(`part1 directions separately`, () => {
		expect(day4.solveForPartOne('XMAS\n....\n....\n....')).toBe('1');
		expect(day4.solveForPartOne('X...\n.M..\n..A.\n...S')).toBe('1');
		expect(day4.solveForPartOne('X...\nM...\nA...\nS...')).toBe('1');
		expect(day4.solveForPartOne('...X\n..M.\n.A..\nS...')).toBe('1');
		expect(day4.solveForPartOne('SAMX\n....\n....\n....')).toBe('1');
		expect(day4.solveForPartOne('S...\n.A..\n..M.\n...X')).toBe('1');
		expect(day4.solveForPartOne('S...\nA...\nM...\nX...')).toBe('1');
		expect(day4.solveForPartOne('...S\n..A.\n.M..\nX...')).toBe('1');
	});

	test(`part2 example`, () => {
		expect(day4.solveForPartTwo(exampleInput2)).toBe('9');
	});
});
