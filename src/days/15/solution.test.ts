import { describe, test, expect } from 'bun:test';
import day15 from './solution';

const smallExample =
	'########\n' +
	'#..O.O.#\n' +
	'##@.O..#\n' +
	'#...O..#\n' +
	'#.#.O..#\n' +
	'#...O..#\n' +
	'#......#\n' +
	'########\n' +
	'\n' +
	'<^^>>>vv<v>>v<<';

const bigExample =
	'##########\n' +
	'#..O..O.O#\n' +
	'#......O.#\n' +
	'#.OO..O.O#\n' +
	'#..O@..O.#\n' +
	'#O#..O...#\n' +
	'#O..O..O.#\n' +
	'#.OO.O.OO#\n' +
	'#....O...#\n' +
	'##########\n' +
	'\n' +
	'<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^\n' +
	'vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v\n' +
	'><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<\n' +
	'<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^\n' +
	'^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><\n' +
	'^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^\n' +
	'>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^\n' +
	'<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>\n' +
	'^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>\n' +
	'v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^';

describe('On Day 15', () => {
	describe('part1', () => {
		test(`solves smallExample`, () => {
			expect(day15.solveForPartOne(smallExample)).toBe('2028');
		});
		test(`solves bigExample`, () => {
			expect(day15.solveForPartOne(bigExample)).toBe('10092');
		});
	});

	describe.skip('part2', () => {
		test(`part2 is identity function`, () => {
			expect(day15.solveForPartTwo('hello')).toBe('hello');
		});
	});
});
