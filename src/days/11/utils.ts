export type TStone = number;
export type TRule = (stone: TStone) => [boolean, TStone[]];

export type TShortcut = number[];

export type TShortcuts = Map<TStone, TShortcut>;

export function getStones(input: string): TStone[] {
	return input.split(' ').map(Number);
}

export function createShortcut(
	shortcuts: TShortcuts,
	stone: TStone,
	step: number,
	value: number
) {
	const shortcut = shortcuts.get(stone);

	if (!shortcut) {
		shortcuts.set(stone, [value]);
	} else {
		if (step > shortcut.length - 1) {
			shortcuts.set(stone, [...shortcut, value]);
		}
	}
	// console.log(
	// 	'creating shortcut',
	// 	stone,
	// 	step,
	// 	getShortcut(shortcuts, stone, step)
	// );
}

export function getShortcut(
	shortcuts: TShortcuts,
	stone: TStone,
	steps: number
): number | null {
	if (shortcuts.has(stone)) {
		const shortcut = shortcuts.get(stone)!;
		if (shortcut.length > steps) {
			return shortcut[steps];
		}
	}
	return null;
}

export function applyRules(
	shortcuts: TShortcuts,
	stone: TStone,
	stepsLeft: number
): number {
	// console.log('stone', stone, 'stepsLeft', stepsLeft);
	if (stepsLeft === 0) {
		createShortcut(shortcuts, stone, 0, 1);
		// console.log('leaf \n\n');
		return 1;
	}

	const shortcut = getShortcut(shortcuts, stone, stepsLeft);
	if (shortcut !== null) {
		// console.log('hit shortcut!', stone, stepsLeft, shortcut);
		// console.log('\n');
		return shortcut;
	}

	const [left, right] = applyRule(stone);
	//left stone
	const belowLeft = applyRules(shortcuts, left, stepsLeft - 1);
	let belowRight = 0;

	createShortcut(shortcuts, stone, 0, 1);
	for (let i = 0; i < stepsLeft; i++) {
		createShortcut(shortcuts, stone, i, getShortcut(shortcuts, left, i)!);
	}

	if (right !== -1) {
		belowRight = applyRules(shortcuts, right, stepsLeft - 1);
		createShortcut(shortcuts, stone, 0, 1);
		for (let i = 0; i < stepsLeft; i++) {
			const shortcutLeft = getShortcut(shortcuts, left, i)!;
			const shortcutRight = getShortcut(shortcuts, right, i)!;

			// console.log(shortcutLeft, shortcutRight);

			createShortcut(shortcuts, stone, i, shortcutLeft + shortcutRight);
		}
	}

	// console.log('\n');
	return belowLeft + belowRight;
}

export function applyRule(stone: TStone): [TStone, TStone] {
	if (stone === 0) {
		return [1, -1];
	}

	const str = `${stone}`;
	if (str.length % 2 === 0) {
		// is even number of digits
		const halfIndex = Math.floor(`${stone}`.length / 2);
		return [
			Number(str.substring(0, halfIndex)),
			Number(str.substring(halfIndex, str.length)),
		];
	}

	return [stone * 2024, -1];
}
