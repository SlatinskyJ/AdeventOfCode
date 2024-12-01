import { Day } from 'templates/day';

class Day1 extends Day {
	constructor() {
		super(1);
	}

	solveForPartOne(input: string): string {
		let leftList: number[] = [];
		let rightList: number[] = [];

		const lines = input.split('\n');
		for (const line of lines) {
			const split = line.split(' ');

			leftList.push(Number(split[0]));
			rightList.push(Number(split[split.length - 1]));
		}

		leftList = leftList.sort((a, b) => a - b);
		rightList = rightList.sort((a, b) => a - b);

		return leftList
			.reduce((acc, curr, index) => {
				return acc + Math.abs(curr - rightList[index]);
			}, 0)
			.toString();
	}

	solveForPartTwo(input: string): string {
		const leftList: number[] = [];
		const rightList: number[] = [];

		const lines = input.split('\n');
		for (const line of lines) {
			const split = line.split(' ');

			leftList.push(Number(split[0]));
			rightList.push(Number(split[split.length - 1]));
		}

		return leftList
			.reduce((acc, curr) => {
				return (
					acc + rightList.filter((val) => val === curr).length * curr
				);
			}, 0)
			.toString();
	}
}

export default new Day1();
