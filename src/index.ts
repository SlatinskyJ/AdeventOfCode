import { Day } from 'templates/day';

import day0 from './days/0/solution';
import day0 from './days/0/solution';
// MORE IMPORTS HERE
const days: Day[] = [
	day0,
	day0,
    // MORE DAYS HERE
];

async function runDay(dayId: number) {
	const resultPart1 = await days[dayId].partOne();
	console.log('Part 1 result:\n');
	console.log(resultPart1);

	console.log('\n');

	const resultPart2 = await days[dayId].partTwo();
	console.log('Part 2 result:\n');
	console.log(resultPart2);
}

console.log('\n\n\n   ADVENT OF CODE \n\n');
const params = process.argv.splice(2);
if (params.length == 1) {
	runDay(Number(params[0]));
} else {
	console.log(`Usage: bun run dev [day]`);
	console.log(`Available days: [ ${days.map((x) => x.id).join(', ')} ]`);
}
