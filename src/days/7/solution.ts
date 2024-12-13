import { Day } from 'templates/day';
import { Combinations } from './Combinations.ts';

class Day7 extends Day {
	constructor() {
		super(7);
	}

	solveForPartOne(input: string): string {
		const lines = input.split('\n');
		const result = lines
			.map((val) => new Combinations(val))
			.filter((val) => val.isCorrect(2))
			.reduce((acc, curr) => acc + curr.getValue(), 0);

		return `${result}`;
	}

	solveForPartTwo(input: string): string {
		const lines = input.split('\n');
		const result = lines
			.map((val) => new Combinations(val))
			.filter((val) => val.isCorrect(3))
			.reduce((acc, curr) => acc + curr.getValue(), 0);

		return `${result}`;
	}
}

export default new Day7();
