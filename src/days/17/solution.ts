import { Day } from 'templates/day';
import {
	BASE_INSTRUCTIONS,
	createProcessor,
	executeProgram,
	parseInput,
} from './utils.ts';

class Day17 extends Day {
	constructor() {
		super(17);
	}

	solveForPartOne(input: string): string {
		const [registers, program] = parseInput(input);

		const processor = createProcessor(
			BASE_INSTRUCTIONS,
			program,
			registers
		);
		const out = executeProgram(processor);

		return out.join(',');
	}

	solveForPartTwo(input: string): string {
		const [regs, program] = parseInput(input);
		const processor = createProcessor(BASE_INSTRUCTIONS, program, regs);
		const expectedOut = program.join(',');

		let x = 8 ** 15;

		for (; ; x++) {
			if (x % 10000 === 0) console.log(x / 10000);
			regs.regA = x;
			processor.regs = regs;

			if (
				executeProgram(processor, expectedOut.length).join(',') ===
				expectedOut
			) {
				break;
			}
		}
		return `${x}`;
	}
}

export default new Day17();
