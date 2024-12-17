import { Day } from 'templates/day';
import { alwaysRule, applyRules, baseRule, evenRule, getStones, type TRule, type TShortcuts } from './utils.ts';

class Day11 extends Day {
	constructor() {
		super(11);
	}

	solveForPartOne(input: string, iterations: number = 25): string {
		let stones = getStones(input);
		const rules: TRule[] = [baseRule, evenRule, alwaysRule];

		const shortcuts: TShortcuts = new Map();

		for (let i = 0; i < iterations; i++) {
			console.log(`on ireration: ${i}`);
			stones = stones.map(stone => applyRules(stone, shortcuts, ...rules)).reduce((acc, curr) => ([...acc, ...curr]), []);
		}

		return `${stones.length}`;
	}

	solveForPartTwo(input: string): string {
		return this.solveForPartOne(input, 75);
	}
}

export default new Day11();
