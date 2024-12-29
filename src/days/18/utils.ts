export type TCoordinates = [number, number];
type TSpace = '.' | '#';
export type TMap = TSpace[][];

export function parseInput(input: string, max: number): TCoordinates[] {
	const lines = input.split('\n');

	return lines
		.map((line) => {
			const [x, y] = line.split(',');
			return [Number(x), Number(y)] as TCoordinates;
		})
		.slice(0, max);
}

export function createMapWithObstacles(
	size: number,
	bytes: TCoordinates[]
): TMap {
	return new Array(size)
		.fill([])
		.map((_, y) =>
			new Array(size)
				.fill('.')
				.map((_, x) =>
					bytes.find((byte) => byte[0] === x && byte[1] === y)
						? '#'
						: '.'
				)
		);
}
