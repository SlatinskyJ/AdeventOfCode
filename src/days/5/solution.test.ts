import { describe, test, expect } from 'bun:test';
import day5 from './solution';

const exampleInput =
	'47|53\n' +
	'97|13\n' +
	'97|61\n' +
	'97|47\n' +
	'75|29\n' +
	'61|13\n' +
	'75|53\n' +
	'29|13\n' +
	'97|29\n' +
	'53|29\n' +
	'61|53\n' +
	'97|53\n' +
	'61|29\n' +
	'47|13\n' +
	'75|47\n' +
	'97|75\n' +
	'47|61\n' +
	'75|61\n' +
	'47|29\n' +
	'75|13\n' +
	'53|13\n' +
	'\n' +
	'75,47,61,53,29\n' +
	'97,61,53,29,13\n' +
	'75,29,13\n' +
	'75,97,47,61,53\n' +
	'61,13,29\n' +
	'97,13,75,29,47';

describe('On Day 5', () => {
	test(`part1 solves example`, () => {
		expect(day5.solveForPartOne(exampleInput)).toBe('143');
	});
	test(`part2 solves example`, () => {
		expect(day5.solveForPartTwo(exampleInput)).toBe('123');
	});
});
