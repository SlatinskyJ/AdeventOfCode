import { Day } from 'templates/day';
import Board from './Board.ts';

class Day6 extends Day {
	constructor() {
		super(6);
	}

	solveForPartOne(input: string): string {
		const board = new Board(input);

		while (!board.step()) {
			//do nothing
		}

		return `${board.getVisitedFields()}`;
	}

	solveForPartTwo(input: string): string {
		return input;
	}
}

export default new Day6();
