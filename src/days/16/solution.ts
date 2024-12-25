import { Day } from 'templates/day';
import { findShortestRoute, parseInput } from './utils.ts';

class Day16 extends Day {
	constructor() {
		super(16);
	}

	solveForPartOne(input: string): string {
		const map = parseInput(input);
		return `${findShortestRoute(map)}`;
	}

	solveForPartTwo(input: string): string {
		return input;
	}
}

export default new Day16();
