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
		//TODO
		return '';
	}
}

export default new Day17();
