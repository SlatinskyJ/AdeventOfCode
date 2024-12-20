import { Day } from 'templates/day';
import { calculateSafetyRating, moveNSteps, parseRobots } from './utils.ts';

class Day14 extends Day {
	constructor() {
		super(14);
	}

	//211963400 - to LOW
	solveForPartOne(
		input: string,
		width: number = 101,
		height: number = 103
	): string {
		let robots = parseRobots(input);
		robots = moveNSteps(robots, 100, width, height);

		const safetyRating = calculateSafetyRating(robots, width, height);
		return `${safetyRating}`;
	}

	solveForPartTwo(input: string): string {
		return input;
	}
}

export default new Day14();
