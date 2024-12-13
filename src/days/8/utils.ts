import type { TAntennas, TCoordinates, TMap } from './types.ts';

export function isOnMap(map: TMap, coordinates: TCoordinates): boolean {
	const [x, y] = coordinates;
	const maxY = map.length;
	const maxX = map[0].length;

	return x >= 0 && x < maxX && y >= 0 && y < maxY;
}

export function parseMap(input: string): TMap {
	const lines = input.split('\n');
	return lines.map((line) => [...line]);
}

export function getAntennas(map: TMap): TAntennas {
	const antennas: TAntennas = new Map();

	map.forEach((row, y) => {
		row.forEach((col, x) => {
			if (col !== '.') {
				if (antennas.has(col)) {
					antennas.set(col, [...antennas.get(col)!, [x, y]]);
				} else {
					antennas.set(col, [[x, y]]);
				}
			}
		});
	});

	return antennas;
}

export type TGetAntinodes = (
	a: TCoordinates,
	b: TCoordinates
) => TCoordinates[];

export const getResonantAntinodesForAntennaPairFactory =
	(max: number): TGetAntinodes =>
	(a, b) =>
		getResonantAntinodesForAntennaPair(max, a, b);

export const getResonantAntinodesForAntennaPair = (
	max: number,
	a: TCoordinates,
	b: TCoordinates
): TCoordinates[] => {
	const [ax, ay] = a;
	const [bx, by] = b;

	const [difx, dify] = [ax - bx, ay - by];
	const positiveAntinodes: TCoordinates[] = [];
	const negativeAntinodes: TCoordinates[] = [];

	for (let i = 0; i < max + 1; i++) {
		positiveAntinodes.push([ax + i * difx, ay + i * dify]);
		negativeAntinodes.push([bx + -1 * i * difx, by + -1 * i * dify]);
	}

	return [...positiveAntinodes, ...negativeAntinodes];
};

export const getAntinodesForAntennaPair: TGetAntinodes = (a, b) => {
	const [ax, ay] = a;
	const [bx, by] = b;

	const [difx, dify] = [ax - bx, ay - by];
	const antinode1: TCoordinates = [ax + difx, ay + dify];
	const antinode2: TCoordinates = [bx - difx, by - dify];

	return [antinode1, antinode2];
};

export function getAntinodes(
	map: TMap,
	antennas: TAntennas,
	getAntinodes: TGetAntinodes
): TCoordinates[] {
	const antinodes: TCoordinates[] = [];

	for (const [, antennasCoordinates] of antennas) {
		antennasCoordinates.forEach((antenna, i) => {
			for (let j = i + 1; j < antennasCoordinates.length; j++) {
				antinodes.push(
					...getAntinodes(antenna, antennasCoordinates[j])
				);
			}
		});
	}

	return (
		antinodes
			// Only unique
			.filter(
				(val, i, arr) =>
					arr.findIndex(
						(sVal) => sVal[0] === val[0] && sVal[1] === val[1]
					) === i
			)
			.filter((val) => isOnMap(map, val))
	);
}
