import { Day } from 'templates/day';
import { createMapWithObstacles, parseInput } from './utils.ts';

class Day18 extends Day {
	constructor() {
		super(18);
	}

	solveForPartOne(
		input: string,
		size: number = 71,
		maxBytes: number = 1024
	): string {
		const bytes = parseInput(input, maxBytes);
		const map = createMapWithObstacles(size, bytes);

		map.forEach((val) => {
			console.log(val);
		});
		return input;
	}

	solveForPartTwo(input: string): string {
		return input;
	}
}

export default new Day18();
