import { Day } from 'templates/day';

type IMulInstruction = [number, number];
type IFlagInstruction = boolean;

type IInstruction = IMulInstruction | IFlagInstruction;

class Day3 extends Day {
	constructor() {
		super(3);
	}

	solveForPartOne(input: string): string {
		let sum = 0;

		const instructions = this.findInstructions(
			input,
			/mul\(\d{1,3},\d{1,3}\)/gm
		);
		sum += this.executeInstructions(instructions);

		return `${sum}`;
	}

	findInstructions(input: string, regexp: RegExp): IInstruction[] {
		const instructions = input.match(regexp);
		if (instructions === null) {
			return [];
		}

		return instructions
			.map((instruction) => instruction.match(/\d+|do\(\)|don't\(\)/gm))
			.map((ins) => {
				if (ins?.toString() === 'do()') {
					return true;
				}
				if (ins?.toString() === "don't()") {
					return false;
				}

				return ins!.map(Number);
			}) as [number, number][];
	}

	executeInstructions(instructions: IInstruction[]): number {
		let currentFlag = true;

		return instructions.reduce((acc, instruction) => {
			const result = this.executeInstruction(instruction);
			if (typeof result === 'boolean') {
				currentFlag = result;
				return acc;
			}
			if (currentFlag) {
				return acc + result;
			}
			return acc;
		}, 0);
	}

	executeInstruction(instruction: IInstruction): number | boolean {
		if (typeof instruction === 'boolean') {
			return instruction;
		}
		if (typeof instruction === 'object') {
			return instruction[0] * instruction[1];
		}

		return 0;
	}

	solveForPartTwo(input: string): string {
		let sum = 0;

		const instructions = this.findInstructions(
			input,
			/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/gm
		);
		sum += this.executeInstructions(instructions);

		return `${sum}`;
	}
}

export default new Day3();
