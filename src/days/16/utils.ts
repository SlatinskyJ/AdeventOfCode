import { valueInArray } from '../../helpers/array.ts';

export type TSpace = '#' | '.' | 'E' | 'S';
export type TMap = TSpace[][];
type TDirection = 'N' | 'E' | 'S' | 'W';
type TCoordinate = {
	x: number;
	y: number;
};

export function parseInput(input: string): TMap {
	return input.split('\n').map((line) => [...line] as TSpace[]);
}

function findStart(map: TMap): TCoordinate {
	let coordinates: TCoordinate | null = null;

	for (let row = 0; row < map.length; row++) {
		const col = map[row].indexOf('S');
		if (col !== -1) {
			coordinates = { x: col, y: row };
			break;
		}
	}

	if (coordinates === null) {
		throw new Error('Cannot find Start!');
	}

	return coordinates;
}

function isFinish(space: TSpace): boolean {
	return space === 'E';
}

function crawl(
	map: TMap,
	coordinates: TCoordinate,
	direction: TDirection,
	currentDistance: number,
	visitedFields: TCoordinate[],
	maxDistance: number | null
): number | null {
	//too far
	if (!!maxDistance && currentDistance >= maxDistance) {
		return maxDistance;
	}

	//is visited
	if (
		visitedFields.find(
			(val) => val.x === coordinates.x && val.y === coordinates.y
		) !== undefined
	) {
		return null;
	}

	// is wall
	if (valueInArray(map, coordinates.x, coordinates.y) === '#') {
		return null;
	}

	//is finish
	if (isFinish(valueInArray(map, coordinates.x, coordinates.y)!)) {
		return currentDistance;
	}

	//crawl
	const [left, straight, right] = getNextFields(map, coordinates, direction);

	const straightScore = crawl(
		map,
		straight.coordinates,
		straight.direction,
		currentDistance + 1,
		[...visitedFields, coordinates],
		maxDistance
	);
	const leftScore = crawl(
		map,
		left.coordinates,
		left.direction,
		currentDistance + 1001,
		[...visitedFields, coordinates],
		straightScore
	);
	const rightScore = crawl(
		map,
		right.coordinates,
		right.direction,
		currentDistance + 1001,
		[...visitedFields, coordinates],
		leftScore
	);

	const vals = [straightScore, leftScore, rightScore].filter(
		(val) => val !== null
	);

	if (vals.length > 0) {
		return Math.min(...vals);
	}

	return null;
}

// returns in order left, straight, right
function getNextFields(
	map: TMap,
	coordinates: TCoordinate,
	direction: TDirection
): [
	{ direction: TDirection; coordinates: TCoordinate },
	{ direction: TDirection; coordinates: TCoordinate },
	{ direction: TDirection; coordinates: TCoordinate },
] {
	const { x, y } = coordinates;

	switch (direction) {
		case 'N':
			return [
				{
					coordinates: {
						x: x - 1,
						y: y,
					},
					direction: 'W',
				},
				{
					coordinates: {
						x: x,
						y: y - 1,
					},
					direction: 'N',
				},
				{
					coordinates: {
						x: x + 1,
						y: y,
					},
					direction: 'E',
				},
			];
		case 'E':
			return [
				{
					coordinates: {
						x: x,
						y: y - 1,
					},
					direction: 'N',
				},
				{
					coordinates: {
						x: x + 1,
						y: y,
					},
					direction: 'E',
				},
				{
					coordinates: {
						x: x,
						y: y + 1,
					},
					direction: 'S',
				},
			];
		case 'S':
			return [
				{
					coordinates: {
						x: x + 1,
						y: y,
					},
					direction: 'E',
				},
				{
					coordinates: {
						x: x,
						y: y + 1,
					},
					direction: 'S',
				},
				{
					coordinates: {
						x: x - 1,
						y: y,
					},
					direction: 'W',
				},
			];
		case 'W':
			return [
				{
					coordinates: {
						x: x,
						y: y + 1,
					},
					direction: 'S',
				},
				{
					coordinates: {
						x: x - 1,
						y: y,
					},
					direction: 'W',
				},
				{
					coordinates: {
						x: x,
						y: y - 1,
					},
					direction: 'N',
				},
			];
	}

	throw new Error('Not implemented yet');
}

export function findShortestRoute(map: TMap): number {
	const start = findStart(map);
	const { x, y } = start;

	//start with East
	const max = crawl(map, start, 'E', 0, [], null);
	let leftMax: number | null = null;
	//if left is not wall -> crawl left as well
	const leftSpace = valueInArray(map, x - 1, y)!;
	if (leftSpace !== '#') {
		// left is finish
		if (isFinish(leftSpace) && max !== null && max > 2000) {
			return 2001;
		}
		leftMax = crawl(map, start, 'W', 2001, [start], null);
		//
	}

	if (leftMax !== null && max !== null) {
		return leftMax < max ? leftMax : max;
	}
	if (leftMax === null && max !== null) {
		return max;
	}
	if (max === null && leftMax !== null) {
		return leftMax;
	}

	throw new Error("Can't find a route!");
}
