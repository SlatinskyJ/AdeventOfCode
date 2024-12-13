import { Day } from 'templates/day';
import {
	calculateHashSum,
	compactDisk,
	compactFiles,
	getRealRepresentation,
} from './utils.ts';

class Day9 extends Day {
	constructor() {
		super(9);
	}

	solveForPartOne(input: string): string {
		const diskState = getRealRepresentation(input);
		const compacted = compactDisk(diskState);
		const hash = calculateHashSum(compacted);

		return `${hash}`;
	}

	// to High - 9663148668150
	solveForPartTwo(input: string): string {
		const diskState = getRealRepresentation(input);
		const compacted = compactFiles(diskState);
		const hash = calculateHashSum(compacted);

		return `${hash}`;
	}
}

export default new Day9();
