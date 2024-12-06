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

	createXReg(regexp: string, parameter: number) {
		//'/A(((?<=M.{10})(?=.{9}S))|((?<=S.{10})(?=.{9}M)))((?<=S.{8})(?=.{7}M)|(?<=M.{8})(?=.{7}S))/gs'
		// A = 10
		// B = 9
		// C = 8
		// D = 7
		const matcher = (
			[
				['{valA}', parameter + 2],
				['{valB}', parameter + 1],
				['{valC}', parameter],
				['{valD}', parameter - 1],
			] satisfies [string, number][]
		).reduce((acc, [i, val]) => acc.replaceAll(i, `${val}`), regexp);

		return new RegExp(matcher, 'gs');
	}

	solveForPartTwo(input: string): string {
		const length = input.split('\n').length;

		const matcher =
			'A(((?<=M.{{valA}})(?=.{{valB}}S))|((?<=S.{{valA}})(?=.{{valB}}M)))((?<=S.{{valC}})(?=.{{valD}}M)|(?<=M.{{valC}})(?=.{{valD}}S))';

		const myRegEx = this.createXReg(matcher, length);

		return `${input.match(myRegEx)!.length}`;
	}
}

export default new Day4();
