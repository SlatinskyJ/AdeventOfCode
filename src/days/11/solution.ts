import { Day } from 'templates/day';
import { applyRules, getStones, type TShortcuts } from './utils.ts';

class Day11 extends Day {
	constructor() {
		super(11);
	}

	solveForPartOne(input: string, iterations: number = 25): string {
		const stones = getStones(input);
		const shortcuts: TShortcuts = new Map();

		return `${stones
			.map((stone) => applyRules(shortcuts, stone, iterations))
			.reduce((acc, val) => acc + val, 0)}`;
	}

	solveForPartTwo(input: string): string {
		return this.solveForPartOne(input, 75);
	}
}

export default new Day11();
