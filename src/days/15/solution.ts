import { Day } from 'templates/day';
import {
	calculateCoordinateSum,
	executeInstructions,
	parseInput,
} from './utils.ts';

class Day15 extends Day {
	constructor() {
		super(15);
	}

	solveForPartOne(input: string): string {
		// eslint-disable-next-line prefer-const
		let [map, robot] = parseInput(input);

		map = executeInstructions(map, robot);
		// map.forEach((val) => console.log(val));

		const coordinatesSum = calculateCoordinateSum(map);

		return `${coordinatesSum}`;
	}

	solveForPartTwo(input: string): string {
		return input;
	}
}

export default new Day15();
