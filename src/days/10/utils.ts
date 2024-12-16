export type TMap = number[][];
export type TCoordinate = [number, number];
export type TScore = number;

export function parseMap(input: string): TMap {
	const lines = input.split('\n');

	return lines.map((line) => [...line].map(Number));
}

export function findTrailHeads(map: TMap): TCoordinate[] {
	const trailHeads: TCoordinate[] = [];

	for (let row = 0; row < map.length; row++) {
		for (let col = 0; col < map[row].length; col++) {
			if (map[row][col] === 0) {
				trailHeads.push([col, row] as TCoordinate);
			}
		}
	}

	return trailHeads;
}

export function walk(
	map: TMap,
	x: number,
	y: number,
	height: number
): TCoordinate[] {
	if (y < 0 || y > map.length - 1 || x < 0 || x > map[y].length - 1) {
		//is out of bounds
		return [];
	}
	if (height === 9) {
		//is final height
		if (map[y][x] === 9) {
			return [[x, y]];
		}
		return [];
	}
	if (map[y][x] === height) {
		//continue to all directions
		return [
			...walk(map, x - 1, y, height + 1),
			...walk(map, x, y - 1, height + 1),
			...walk(map, x + 1, y, height + 1),
			...walk(map, x, y + 1, height + 1),
		];
	}

	return [];
}

export function findUniqueTrails(head: TCoordinate, map: TMap): TScore {
	const peaks = walk(map, ...head, 0);
	return peaks.filter(
		(val, i, arr) =>
			arr.findIndex(
				(sVal) => sVal[0] === val[0] && sVal[1] === val[1]
			) === i
	).length;
}

export function findAllTrails(head: TCoordinate, map: TMap): TScore {
	const peaks = walk(map, ...head, 0);
	return peaks.length;
}
