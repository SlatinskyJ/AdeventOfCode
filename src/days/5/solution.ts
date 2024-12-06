import { Day } from 'templates/day';

class Day5 extends Day {
	constructor() {
		super(5);
	}

	solveForPartOne(input: string): string {
		const [rulesInput, updateInput] = input.split('\n\n');

		const rules = this.parseRules(rulesInput);
		const updates = this.parseUpdates(updateInput);

		return `${updates.reduce(
			(acc, update) => acc + this.isUpdateCorrect(update, rules),
			0
		)}`;
	}

	isUpdateCorrect(update: number[], rules: Map<number, number[]>): number {
		const isCorrect = update.reduce((isUpdateCorrect, page, pageIndex) => {
			if (rules.has(page)) {
				//check the rule
				const afterPages = rules.get(page)!;
				return (
					isUpdateCorrect &&
					afterPages.reduce((acc, curr) => {
						const laterPageNumber = update.findIndex(
							(val) => curr === val
						);
						if (laterPageNumber !== -1) {
							return acc && laterPageNumber > pageIndex;
						}
						return acc;
					}, true)
				);
			}
			return isUpdateCorrect;
		}, true);

		return isCorrect ? update[Math.floor(update.length / 2)] : 0;
	}

	parseRules(rulesInput: string): Map<number, number[]> {
		const pagesOrdering = rulesInput
			.split('\n')
			.map((rule) => rule.split('|').map(Number) as [number, number]);

		const rulesMap = new Map<number, number[]>();

		pagesOrdering.forEach(([before, after]) =>
			rulesMap.has(before)
				? rulesMap.set(before, [...rulesMap.get(before)!, after])
				: rulesMap.set(before, [after])
		);

		return rulesMap;
	}

	parseUpdates(updateInput: string): number[][] {
		return updateInput
			.split('\n')
			.map((line) => line.split(',').map(Number));
	}

	solveForPartTwo(input: string): string {
		const [rulesInput, updateInput] = input.split('\n\n');

		const rules = this.parseRules(rulesInput);
		const updates = this.parseUpdates(updateInput);

		return `${updates.reduce(
			(acc, update) => acc + this.isUpdateIncorrect(update, rules),
			0
		)}`;
	}

	isUpdateIncorrect(update: number[], rules: Map<number, number[]>): number {
		const isCorrect = update.reduce((isUpdateCorrect, page, pageIndex) => {
			if (rules.has(page)) {
				//check the rule
				const afterPages = rules.get(page)!;
				return (
					isUpdateCorrect &&
					afterPages.reduce((acc, curr) => {
						const laterPageNumber = update.findIndex(
							(val) => curr === val
						);
						if (laterPageNumber !== -1) {
							return acc && laterPageNumber > pageIndex;
						}
						return acc;
					}, true)
				);
			}
			return isUpdateCorrect;
		}, true);

		return isCorrect ? 0 : this.correctUpdate(update, rules);
	}

	correctUpdate(update: number[], rules: Map<number, number[]>): number {
		const corrected = update;
		for (let i = 0; i < update.length; ) {
			if (rules.has(update[i])) {
				//has page affected by rule
				const afterPage = rules
					.get(update[i])!
					.map((val) => update.findIndex((x) => x === val))
					.filter((x) => x !== -1)
					.sort((a, b) => a - b)[0];

				if (afterPage !== undefined && afterPage < i) {
					this.swapElements(corrected, i, afterPage);
					i = afterPage - 1;
				}
			}
			i++;
		}

		return corrected[Math.floor(corrected.length / 2)];
	}

	swapElements = (array: number[], i1: number, i2: number) => {
		[array[i1], array[i2]] = [array[i2], array[i1]];
	};
}

export default new Day5();
