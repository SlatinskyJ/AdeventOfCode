export type TStone = number;
export type TRule = (stone: TStone) => [boolean, TStone[]];

export type TShortcuts = Map<number, TStone[]>;

export function getStones(input: string): TStone[] {
	return input.split(' ').map(Number);
}

export function applyRules(stone: TStone, shortcuts: TShortcuts, ...rules: TRule[]): TStone[] {
	if (shortcuts.has(stone)) {
		return shortcuts.get(stone)!;
	}

	let index = 0;
	let [isFinished, newStones] = rules[index](stone);

	while (!isFinished) {
		index++;
		[isFinished, newStones] = rules[index](stone);
	}

	shortcuts.set(stone, newStones);
	return newStones;
}

export const baseRule: TRule = (stone) => {
	if (stone === 0) {
		return [true, [1]];
	}

	return [false, [stone]];
};

export const evenRule: TRule = (stone) => {
	const str = `${stone}`;
	if (str.length % 2 === 0) {
		// is even number of digits
		const halfIndex = Math.floor(str.length / 2);
		return [true, [Number(str.substring(0, halfIndex)), Number(str.substring(halfIndex, str.length))]];
	}

	return [false, [stone]];
};

export const alwaysRule: TRule = (stone) => {
	return [true, [stone * 2024]];
};