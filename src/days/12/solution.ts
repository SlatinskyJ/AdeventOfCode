import { Day } from 'templates/day';
import { calculatePrice, fenceMap, parseInput } from './utils.ts';

class Day12 extends Day {
	constructor() {
		super(12);
	}

	solveForPartOne(input: string): string {
		const map = parseInput(input);
		const mapWithFences = fenceMap(map);
		const price = calculatePrice(mapWithFences);

		return `${price}`;
	}

	solveForPartTwo(input: string): string {
		return input;
	}
}

export default new Day12();
