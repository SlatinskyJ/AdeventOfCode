import { Day } from 'templates/day';
import { parseMachines, solveMachine } from './utils.ts';

class Day13 extends Day {
	constructor() {
		super(13);
	}

	solveForPartOne(input: string, prizeAddition?: number): string {
		const machines = parseMachines(input, prizeAddition);
		const costInTokens = machines
			.map((machine) => solveMachine(machine))
			.filter((val) => val !== null)
			.reduce((acc, val) => acc + val, 0);

		return `${costInTokens}`;
	}

	solveForPartTwo(input: string): string {
		return this.solveForPartOne(input, 10000000000000);
	}
}

export default new Day13();
