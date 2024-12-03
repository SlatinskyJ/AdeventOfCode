import { Day } from 'templates/day';

class Day3 extends Day {
	constructor() {
		super(3);
	}

	solveForPartOne(input: string): string {
		let sum = 0;

		const instructions = this.findInstructions(input);
		sum += this.executeAndAdd(instructions);

		return `${sum}`;
	}

	findInstructions(input: string): [number, number][] {
		const instructions = input.match(/mul\(\d{1,3},\d{1,3}\)/gm);
		if (instructions === null) {
			return [];
		}
		return instructions
			.map((instruction) => instruction.match(/\d+/gm))
			.map((pair) => pair!.map(Number)) as [number, number][];
	}

	executeAndAdd(instructions: [number, number][]): number {
		return instructions.reduce((acc, [a, b]) => acc + a * b, 0);
	}

	solveForPartTwo(input: string): string {
		return input;
	}
}

export default new Day3();
