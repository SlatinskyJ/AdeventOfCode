import { Day } from 'templates/day';

import day1 from './days/1/solution';
import day2 from './days/2/solution';
import day3 from './days/3/solution';
import day4 from './days/4/solution';
import day5 from './days/5/solution';
import day6 from './days/6/solution';
import day7 from './days/7/solution';
import day8 from './days/8/solution';
import day9 from './days/9/solution';
import day10 from './days/10/solution';
import day11 from './days/11/solution';
import day12 from './days/12/solution';
import day13 from './days/13/solution';
import day14 from './days/14/solution';
import day15 from './days/15/solution';
import day16 from './days/16/solution';
import day17 from './days/17/solution';
import day18 from './days/18/solution';
// MORE IMPORTS HERE

const days: Map<number, Day> = new Map([
	[1, day1],
	[2, day2],
	[3, day3],
	[4, day4],
	[5, day5],
	[6, day6],
	[7, day7],
	[8, day8],
	[9, day9],
	[10, day10],
	[11, day11],
	[12, day12],
	[13, day13],
	[14, day14],
	[15, day15],
	[16, day16],
    [17, day17],
    [18, day18],
    // MORE DAYS HERE
]);

async function runDay(dayId: number) {
	const resultPart1 = await days.get(dayId)?.partOne();
	console.log('Part 1 result:\n');
	console.log(resultPart1);

	console.log('\n');

	const resultPart2 = await days.get(dayId)?.partTwo();
	console.log('Part 2 result:\n');
	console.log(resultPart2);
}

console.log('\n\n\n   ADVENT OF CODE \n\n');
const params = process.argv.splice(2);
if (params.length == 1) {
	runDay(Number(params[0]));
} else {
	console.log(`Usage: bun run dev [day]`);
	console.log(
		`Available days: [ ${days
			.entries()
			.map(([, x]) => x.id)
			.reduce(
				(acc, cur, index) =>
					index !== 0 ? `${acc}, ${cur}` : `${cur}`,
				''
			)} ]`
	);
}
