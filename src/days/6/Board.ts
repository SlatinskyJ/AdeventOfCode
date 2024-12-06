enum EFieldState {
	OBSTACLE = '#',
	UNVISITED = '.',
	VISITED = 'X',
}

enum EDirection {
	UP = '^',
	RIGHT = '>',
	LEFT = '<',
	DOWN = 'v',
}

type IGuard = {
	direction: EDirection;
	position: [number, number];
};

class Board {
	private board: EFieldState[][];
	private guard: IGuard;

	constructor(input: string) {
		const [guardPosition, guardDirection] =
			this.getGuardPositionFromInput(input);

		this.guard = { direction: guardDirection, position: guardPosition };
		this.board = this.parseBoard(input);
	}

	/**
	 * @returns true when guard is moving away from board
	 */
	public step(): boolean {
		this.board[this.guard.position[1]][this.guard.position[0]] =
			EFieldState.VISITED;

		const nextFieldPosition = this.getNextField();

		if (
			this.board[nextFieldPosition[1]] !== undefined &&
			this.board[nextFieldPosition[1]][nextFieldPosition[0]] !== undefined
		) {
			const nextField =
				this.board[nextFieldPosition[1]][nextFieldPosition[0]];

			if (nextField === EFieldState.OBSTACLE) {
				this.guard.direction = this.getNextDirection();
			} else {
				this.guard.position = nextFieldPosition;
			}

			return false;
		}

		return true;
	}

	private getNextDirection(): EDirection {
		switch (this.guard.direction) {
			case EDirection.UP:
				return EDirection.RIGHT;
			case EDirection.RIGHT:
				return EDirection.DOWN;
			case EDirection.DOWN:
				return EDirection.LEFT;
			case EDirection.LEFT:
				return EDirection.UP;
		}
	}

	private getNextField(): [number, number] {
		switch (this.guard.direction) {
			case EDirection.UP:
				return [this.guard.position[0], this.guard.position[1] - 1];
			case EDirection.RIGHT:
				return [this.guard.position[0] + 1, this.guard.position[1]];
			case EDirection.DOWN:
				return [this.guard.position[0], this.guard.position[1] + 1];
			case EDirection.LEFT:
				return [this.guard.position[0] - 1, this.guard.position[1]];
		}
	}

	public getVisitedFields(): number {
		return this.board.reduce(
			(acc, row) =>
				acc +
				row.reduce(
					(rowAcc, val) =>
						val === EFieldState.VISITED ? rowAcc + 1 : rowAcc,
					0
				),
			0
		);
	}

	private getGuardPositionFromInput(
		input: string
	): [[number, number], EDirection] {
		const isUp = input.indexOf(EDirection.UP);
		const isLeft = input.indexOf(EDirection.LEFT);
		const isRight = input.indexOf(EDirection.RIGHT);
		const isDown = input.indexOf(EDirection.DOWN);

		const length = input.split('\n').length + 1;

		if (isUp !== -1) {
			return [[isUp % length, Math.floor(isUp / length)], EDirection.UP];
		}
		if (isLeft !== -1) {
			return [
				[isLeft % length, Math.floor(isLeft / length)],
				EDirection.LEFT,
			];
		}
		if (isRight !== -1) {
			return [
				[isRight % length, Math.floor(isRight / length)],
				EDirection.RIGHT,
			];
		}
		if (isDown !== -1) {
			return [
				[isDown % length, Math.floor(isDown / length)],
				EDirection.DOWN,
			];
		}

		throw new Error('Guard not found!');
	}

	private parseBoard(input: string): EFieldState[][] {
		const lines = input.split('\n');
		const board: EFieldState[][] = [];

		for (const line of lines) {
			const row: EFieldState[] = [];
			for (const char of line) {
				row.push(this.parseField(char));
			}
			board.push(row);
		}

		return board;
	}

	private parseField(char: string): EFieldState {
		switch (char) {
			case EFieldState.UNVISITED:
				return EFieldState.UNVISITED;
			case EFieldState.OBSTACLE:
				return EFieldState.OBSTACLE;
			case EFieldState.VISITED:
				return EFieldState.VISITED;
			case EDirection.UP ||
				EDirection.DOWN ||
				EDirection.LEFT ||
				EDirection.RIGHT:
				return EFieldState.VISITED;
		}

		throw new Error(`Unexpected char: ${char}`);
	}
}

export default Board;
