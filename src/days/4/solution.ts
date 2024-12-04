import { Day } from 'templates/day';

class Day4 extends Day {
	constructor() {
		super(4);
	}

	createRegExp(regexp: string, parameter: number) {
		return new RegExp(regexp.replaceAll('{var}', `${parameter}`), 'gs');
	}

	//1862 to low
	//2530 to high
	solveForPartOne(input: string): string {
		const length = input.split('\n').length;

		const matcher =
			'(?=X.{{var}}M.{{var}}A.{{var}}S|S.{{var}}A.{{var}}M.{{var}}X)';

		const matcher1 = this.createRegExp(matcher, 0);
		const matcher2 = this.createRegExp(matcher, length - 1);
		const matcher3 = this.createRegExp(matcher, length);
		const matcher4 = this.createRegExp(matcher, length + 1);

		const test = [matcher1, matcher2, matcher3, matcher4]
			.map((regex) => input.match(regex))
			.reduce((acc, res) => acc + (res !== null ? res.length : 0), 0);
		return `${test}`;
	}

	solveForPartTwo(input: string): string {
		return input;
	}
}

export default new Day4();
