import { Day } from 'templates/day';
import {
	findUniqueTrails,
	findTrailHeads,
	parseMap,
	findAllTrails,
} from './utils.ts';

class Day10 extends Day {
	constructor() {
		super(10);
	}

	solveForPartOne(input: string): string {
		const map = parseMap(input);
		const trailHeads = findTrailHeads(map);
		const reachablePeaks = trailHeads
			.map((head) => findUniqueTrails(head, map))
			.reduce((acc, curr) => acc + curr, 0);

		return `${reachablePeaks}`;
	}

	solveForPartTwo(input: string): string {
		const map = parseMap(input);
		const trailHeads = findTrailHeads(map);
		const reachablePeaks = trailHeads
			.map((head) => findAllTrails(head, map))
			.reduce((acc, curr) => acc + curr, 0);

		return `${reachablePeaks}`;
	}
}

export default new Day10();
