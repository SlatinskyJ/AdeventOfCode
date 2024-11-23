import fs from 'fs';
import * as process from 'node:process';
import path from 'path';

abstract class Day {
	id: number;
	basePath: string;

	constructor(id: number) {
		this.id = id;
		this.basePath = process.cwd();
	}

	async partOne(): Promise<string> {
		const content = await fs.promises.readFile(
			path.join(this.basePath, `/src/inputs/${this.id}/part1.txt`)
		);
		return this.solveForPartOne(content.toString());
	}

	abstract solveForPartOne(input: string): string;

	async partTwo(): Promise<string> {
		const content = await fs.promises.readFile(
			path.join(this.basePath, `/src/inputs/${this.id}/part2.txt`)
		);
		return this.solveForPartTwo(content.toString());
	}

	abstract solveForPartTwo(input: string): string;
}

export { Day };
