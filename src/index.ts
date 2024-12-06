import { Day } from 'templates/day';

import day1 from './days/1/solution';
import day2 from './days/2/solution';
import day3 from './days/3/solution';
import day4 from './days/4/solution';
import day5 from './days/5/solution';
import day6 from './days/6/solution';
// MORE IMPORTS HERE

const days: Map<number, Day> = new Map([
	[1, day1],
	[2, day2],
    [3, day3],
    [4, day4],
    [5, day5],
    [6, day6],
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
