import { calculate } from './utils.ts';

export interface ICombinations {
	isCorrect: (base: number) => boolean;
	getValue: () => number;
}

export class Combinations implements ICombinations {
	private result: number;
	private numbers: number[];

	constructor(line: string) {
		const [res, nums] = line.split(':');
		this.result = Number(res);
		this.numbers = nums.trim().split(' ').map(Number);
	}

	public isCorrect(base: number) {
		const gaps = this.numbers.length - 1;
		const maxCombinations = base ** gaps;
		for (let i = 0; i < maxCombinations; i++) {
			// console.log(i.toString(2).padStart(gaps, '0'));
			const value = calculate(
				i.toString(base).padStart(gaps, '0'),
				this.numbers
			);

			if (value === this.result) {
				// console.log(i.toString(2).padStart(gaps, '0'));
				// console.log('', value, '\n', this.result, '\n');
				return true;
			}
		}

		return false;
	}

	public getValue() {
		return this.result;
	}
}
