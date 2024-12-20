export type TRobot = {
	position: [number, number];
	velocity: [number, number];
};

function parseRobot(input: string): TRobot {
	const matches = input.match(/-?\d+/g);
	if (matches === null || matches.length !== 4) {
		throw new Error(`Couldnt parse robot ${input}`);
	}
	const [initialX, initialY, velX, velY] = matches!.map(Number);

	return {
		position: [initialX, initialY],
		velocity: [velX, velY],
	};
}

export function parseRobots(input: string): TRobot[] {
	return input.split('\n').map(parseRobot);
}

export function moveNSteps(
	robots: TRobot[],
	steps: number,
	width: number,
	height: number
): TRobot[] {
	return robots.map((robot): TRobot => {
		const [vx, vy] = robot.velocity;
		let newX = (robot.position[0] + vx * steps) % width;
		let newY = (robot.position[1] + vy * steps) % height;

		if (newX < 0) newX += width;
		if (newY < 0) newY += height;

		return {
			position: [newX, newY],
			velocity: robot.velocity,
		};
	});
}

export function calculateSafetyRating(
	robots: TRobot[],
	width: number,
	height: number
): number {
	const halfX = Math.floor(width / 2);
	const halfY = Math.floor(height / 2);

	const leftTop = robots.filter(
		(robot) => robot.position[0] < halfX && robot.position[1] < halfY
	).length;
	const rightTop = robots.filter(
		(robot) => robot.position[0] > halfX && robot.position[1] < halfY
	).length;
	const leftBottom = robots.filter(
		(robot) => robot.position[0] < halfX && robot.position[1] > halfY
	).length;
	const rightBottom = robots.filter(
		(robot) => robot.position[0] > halfX && robot.position[1] > halfY
	).length;

	return [leftTop, rightTop, leftBottom, rightBottom].reduce(
		(acc, val) => acc * val,
		1
	);
}
