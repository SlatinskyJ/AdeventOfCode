import { valueInArray } from '../../helpers/array.ts';

export type TInstruction = '<' | '>' | '^' | 'v';
export type TPosition = { x: number; y: number };
export type TRobot = {
	instructions: TInstruction[];
	position: TPosition;
};

export type TSpace = '#' | 'O' | '.';
export type TMap = TSpace[][];

/**
 * @param input {string} puzzle input
 * @returns {TMap, [number, number]} Map and position of robot
 */
export function createMap(input: string): [TMap, [number, number]] {
	const lines = input.split('\n');
	let robot = [0, 0];
	const map = lines.map((line, row) => {
		return [...line].map((char, col): TSpace => {
			if (char === '@') {
				robot = [col, row];
				return '.';
			}
			return char as TSpace;
		});
	});

	return [map, [robot[0], robot[1]]];
}

export function createRobot(input: string, x: number, y: number): TRobot {
	const instructions = [...input.replaceAll('\n', '')].map(
		(ins) => ins as TInstruction
	);

	return { instructions, position: { x, y } };
}

export function parseInput(input: string): [TMap, TRobot] {
	const [mapInput, robotInput] = input.split('\n\n');

	const [map, [x, y]] = createMap(mapInput);
	const robot = createRobot(robotInput, x, y);

	return [map, robot];
}

export function executeInstructions(map: TMap, robot: TRobot): TMap {
	let instruction = robot.instructions.shift();
	let newPosition = { x: -1, y: -1 };

	while (instruction) {
		[map, newPosition] = executeInstruction(
			map,
			robot.position,
			instruction
		);

		robot.position = newPosition;

		instruction = robot.instructions.shift();
	}

	return map;
}

function executeInstruction(
	map: TMap,
	position: TPosition,
	instruction: TInstruction
): [TMap, TPosition] {
	const nextPosition = getNextPosition(position, instruction);

	const next = valueInArray<TMap>(map, nextPosition.x, nextPosition.y);
	switch (next) {
		case '#':
			return [map, position];
		case '.':
			return [map, nextPosition];
		case 'O':
			if (moveObject(map, nextPosition, instruction)) {
				return [map, nextPosition];
			}
			return [map, position];
		case null:
			throw new Error(`Cant move to new location ${position} in ${map}`);
	}

	throw new Error('Unsupported instruction!');
}

function moveObject(
	map: TMap,
	position: TPosition,
	direction: TInstruction
): boolean {
	const nextPosition = getNextPosition(position, direction);
	const space = valueInArray<TMap>(map, nextPosition.x, nextPosition.y);
	switch (space) {
		case '.':
			map[nextPosition.y][nextPosition.x] = 'O';
			map[position.y][position.x] = '.';
			return true;
		case '#':
			return false;
		case 'O':
			if (moveObject(map, nextPosition, direction)) {
				map[nextPosition.y][nextPosition.x] = 'O';
				map[position.y][position.x] = '.';
				return true;
			}
			return false;
	}
	throw new Error('Error while moving objects');
}

function getNextPosition(
	position: TRobot['position'],
	instruction: TInstruction
): TRobot['position'] {
	switch (instruction) {
		case '<':
			return {
				x: position.x - 1,
				y: position.y,
			};
		case '>':
			return {
				x: position.x + 1,
				y: position.y,
			};
		case '^':
			return {
				x: position.x,
				y: position.y - 1,
			};
		case 'v':
			return {
				x: position.x,
				y: position.y + 1,
			};
	}
}

export function calculateCoordinateSum(map: TMap) {
	return map
		.map((line, row) =>
			line
				.map((place, col) => (place === 'O' ? row * 100 + col : 0))
				.reduce((acc, val) => acc + val, 0)
		)
		.reduce((acc, val) => acc + val, 0);
}
