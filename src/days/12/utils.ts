export type TPlot = {
	id: string;
};

export type TPlotWithFences = TPlot & {
	fences: number;
	isAccountedFor: boolean;
};

export type TMap = TPlot[][];
export type TFencedMap = TPlotWithFences[][];

export function parseInput(input: string): TMap {
	return input.split('\n').map((line) =>
		[...line].map((char) => ({
			id: char,
		}))
	);
}

function isPlotDifferent(a: TPlot, b: TPlot): 0 | 1 {
	return a.id !== b.id ? 1 : 0;
}

export function isOnMap(map: TMap, x: number, y: number): boolean {
	return y >= 0 && y < map.length && x >= 0 && x < map[y].length;
}

export function fenceMap(map: TMap): TFencedMap {
	return map.map((row, rowI) =>
		row.map((plot, colI) => {
			let fences = 0;

			if (isOnMap(map, rowI - 1, colI)) {
				fences += isPlotDifferent(plot, map[rowI - 1][colI]);
			} else fences++;
			if (isOnMap(map, rowI, colI + 1)) {
				fences += isPlotDifferent(plot, map[rowI][colI + 1]);
			} else fences++;
			if (isOnMap(map, rowI + 1, colI)) {
				fences += isPlotDifferent(plot, map[rowI + 1][colI]);
			} else fences++;
			if (isOnMap(map, rowI, colI - 1)) {
				fences += isPlotDifferent(plot, map[rowI][colI - 1]);
			} else fences++;

			return { ...plot, fences, isAccountedFor: false };
		})
	);
}

/**
 * crawl through the map and add up same fields
 * @param map {TFencedMap}
 * @param x {number}
 * @param y {number}
 * @param plot {TPlot}
 * @return {[number, number]} #fences, area
 */
function crawl(
	map: TFencedMap,
	x: number,
	y: number,
	plot: TPlot
): [number, number] {
	if (y < 0 || y >= map.length || x < 0 || x >= map[y].length) {
		return [0, 0];
	}
	if (map[y][x].id !== plot.id || map[y][x].isAccountedFor) {
		return [0, 0];
	}

	map[y][x].isAccountedFor = true;

	const [leftF, leftA] = crawl(map, x - 1, y, plot);
	const [aboveF, aboveA] = crawl(map, x, y - 1, plot);
	const [rightF, rightA] = crawl(map, x + 1, y, plot);
	const [belowF, belowA] = crawl(map, x, y + 1, plot);

	return [
		map[y][x].fences + leftF + aboveF + rightF + belowF,
		1 + leftA + aboveA + rightA + belowA,
	];
}

export function calculatePrice(map: TFencedMap): number {
	// console.log(map);

	return map
		.map((row, y) =>
			row
				.map((plot, x) => {
					const [fences, area] = crawl(map, x, y, plot);
					return fences * area;
				})
				.reduce((acc, val) => acc + val, 0)
		)
		.reduce((acc, val) => acc + val, 0);
}
