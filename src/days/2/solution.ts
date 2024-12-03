import { Day } from 'templates/day';

class Day2 extends Day {
	constructor() {
		super(2);
	}

	isSaveLevel(levels: number[], isIncreasing: boolean): boolean {
		if (levels.length === 1) {
			return true;
		}

		const [first, ...rest] = levels;
		const diff = first - rest[0];

		if (isIncreasing && diff <= -1 && diff >= -3) {
			return this.isSaveLevel(rest, true);
		}
		if (!isIncreasing && diff >= 1 && diff <= 3) {
			return this.isSaveLevel(rest, false);
		}

		return false;
	}

	isSaveReport(levels: number[]) {
		if (levels[0] > levels[1]) {
			return this.isSaveLevel(levels, false);
		}
		if (levels[0] < levels[1]) {
			return this.isSaveLevel(levels, true);
		}

		return false;
	}

	isComparisonsValid(comps: number[]) {
		return (
			comps.filter((val) => val >= 1 && val <= 3).length ===
				comps.length ||
			comps.filter((val) => val <= -1 && val >= -3).length ===
				comps.length
		);
	}

	removeFaulty(comparisons: number[]) {
		let didFix = false;

		const hasZero = comparisons.findIndex((val) => val === 0);

		if (hasZero !== -1) {
			return comparisons.filter((val) => val !== 0);
		}

		const test = comparisons.reduce<number[]>((acc, val, i) => {
			if (i !== comparisons.length - 1) {
				const next = comparisons[i + 1];

				if (
					((next > 0 && val > 0) ||
						(next < 0 && val < 0) ||
						didFix) &&
					((next <= -1 && next >= -3) || (next >= 1 && next <= 3))
				) {
					return [...acc, next];
				}

				didFix = true;
				return [...acc, next + val];
			}
			return acc;
		}, []);

		// console.log(comparisons, test);

		return test;
	}

	isSaveReport2(levels: number[]) {
		const [, ...comparisons] = levels.map((val, i) => {
			if (i === 0) {
				return 0;
			}
			return val - levels[i - 1];
		});

		// console.log(levels, comparisons);
		if (this.isComparisonsValid(comparisons)) return true;

		const positive = comparisons.filter((val) => val >= 0);
		if (comparisons.filter((val) => val === 0).length === 1) {
			return this.isComparisonsValid(this.removeFaulty(comparisons));
		}

		if (
			positive.length === 1 ||
			positive.length === comparisons.length - 1
		) {
			return this.isComparisonsValid(this.removeFaulty(comparisons));
		}

		return false;
	}

	solveForPartOne(input: string): string {
		const lines = input.split('\n');
		let safeReports = 0;

		for (const line of lines) {
			if (this.isSaveReport(line.split(' ').map(Number))) {
				safeReports++;
			}
		}

		return `${safeReports}`;
	}

	solveForPartTwo(input: string): string {
		const lines = input.split('\n');
		let safeReports = 0;

		for (const line of lines) {
			if (this.isSaveReport2(line.split(' ').map(Number))) {
				safeReports++;
			}
		}

		return `${safeReports}`;
	}
}

export default new Day2();
