import { Day } from 'templates/day';
import type { TAntennas, TCoordinates, TMap } from './types.ts';
import {
	getAntennas,
	getAntinodes,
	getAntinodesForAntennaPair,
	getResonantAntinodesForAntennaPairFactory,
	parseMap,
} from './utils.ts';

class Day8 extends Day {
	constructor() {
		super(8);
	}

	solveForPartOne(input: string): string {
		const map: TMap = parseMap(input);

		const antennas: TAntennas = getAntennas(map);
		const antinodes: TCoordinates[] = getAntinodes(
			map,
			antennas,
			getAntinodesForAntennaPair
		);

		return `${antinodes.length}`;
	}

	solveForPartTwo(input: string): string {
		const map: TMap = parseMap(input);

		const antennas: TAntennas = getAntennas(map);
		const antinodes: TCoordinates[] = getAntinodes(
			map,
			antennas,
			getResonantAntinodesForAntennaPairFactory(map.length)
		);

		return `${antinodes.length}`;
	}
}

export default new Day8();
