export type TCoordinate = [number, number];
export type TButton = TCoordinate;
export type TMachine = {
	buttons: TButton[];
	prize: TCoordinate;
};

// assumptions
// button moves crane by a double-digit number in both axis
// button input has always the same format: "Button {letter}: X+{double-digit}, Y+{double-digit}"
// only two buttons per machine
// button A price is 3 and button B price is 1

function parsePrize(input: string, addition: number = 0): TCoordinate {
	const numbers = input.match(/\d+/g);
	return [addition + Number(numbers![0]), addition + Number(numbers![1])];
}

function parseButton(input: string): TButton {
	return [Number(input.substring(12, 14)), Number(input.substring(18, 20))];
}

function parseButtons(input: string[]): TButton[] {
	return [parseButton(input[0]), parseButton(input[1])];
}

function parseMachine(input: string, prizeAddition?: number): TMachine {
	const lines = input.split('\n');
	return {
		prize: parsePrize(lines.pop()!, prizeAddition),
		buttons: parseButtons(lines),
	};
}

export function parseMachines(
	input: string,
	prizeAddition?: number
): TMachine[] {
	return input
		.split('\n\n')
		.map((machine) => parseMachine(machine, prizeAddition));
}

export function solveMachine(machine: TMachine): number | null {
	const [[a1, a2], [b1, b2]] = machine.buttons;
	const [c1, c2] = machine.prize;

	if (a1 * b2 - a2 * b1 === 0) {
		return null;
	}

	const x = (c1 * b2 - b1 * c2) / (a1 * b2 - b1 * a2);
	const y = (a1 * c2 - c1 * a2) / (a1 * b2 - b1 * a2);

	if (x % 1 === 0 && y % 1 === 0) {
		return x * 3 + y;
	}

	return null;
}
