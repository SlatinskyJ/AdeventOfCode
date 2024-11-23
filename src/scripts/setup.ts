import path from 'path';
import { promises, constants } from 'fs';

const basePath = process.cwd();

(async function () {
	const day = Number(process.argv[2]);
	validateArguments(day);

	console.log(`\n\n\nSetting up ${day}. day`);
	await createInputFiles(day);
	await createSolutionFiles(day);
	await updateIndex(day);
	console.log(
		`Today's puzzle is ready.\nYou can write your solution in /src/days/${day}/solution.ts\n\n`
	);
})();

async function createInputFiles(day: number) {
	const inputDayPath = path.join(basePath, 'src', 'inputs', `${day}`);
	await createDirectoryIfItDoesntExist(inputDayPath);
	const year = new Date().getFullYear();

	createFileWithContentIfItDoesntExist(
		path.join(inputDayPath, 'part1.txt'),
		`{visit https://adventofcode.com/${year}/day/${day} and paste the part 1 input here}`
	);

	createFileWithContentIfItDoesntExist(
		path.join(inputDayPath, 'part2.txt'),
		`{After completing day 1, visit https://adventofcode.com/${year}/day/${day} and paste the part 2 input here}`
	);
}

async function createSolutionFiles(day: number) {
	const templateFolder = path.join(basePath, 'src', 'templates');
	const codeFolder = path.join(basePath, 'src', 'days', `${day}`);
	await createDirectoryIfItDoesntExist(codeFolder);
	await copyTemplate(
		path.join(templateFolder, 'solution.ts'),
		path.join(codeFolder, 'solution.ts'),
		day
	);
	await copyTemplate(
		path.join(templateFolder, 'solution.test.ts'),
		path.join(codeFolder, `solution.test.ts`),
		day
	);
}

async function createDirectoryIfItDoesntExist(dir: string) {
	try {
		await promises.access(dir, constants.F_OK | constants.W_OK);
	} catch {
		await promises.mkdir(dir);
	}
}

function validateArguments(day: number) {
	if (process.argv.length !== 3) {
		console.log("Use with bun 'run setup {dayNumber}'");
		process.exit(1);
	}

	if (Number.isNaN(day)) {
		console.log('You have to use number as day argument');
		process.exit(1);
	}
	if (day < 0 && day > 25) {
		console.log('There are only 25 days in advent of code');
		process.exit(1);
	}
}

async function createFileWithContentIfItDoesntExist(
	name: string,
	content: string
) {
	try {
		await promises.access(name, constants.R_OK);
	} catch {
		await promises.writeFile(name, content);
	}
}

async function copyTemplate(from: string, to: string, day: number) {
	const content = (
		await promises.readFile(from, { encoding: 'utf8' })
	).replace(/0/g, `${day}`);
	createFileWithContentIfItDoesntExist(to, content);
}

async function updateIndex(day: number) {
	const indexPath = path.join(basePath, 'src', 'index.ts');
	const contents = (await promises.readFile(indexPath, { encoding: 'utf8' }))
		.replace(
			'// MORE IMPORTS HERE',
			`import day${day} from './day${day}/index';
// MORE IMPORTS HERE`
		)
		.replace(
			'// MORE DAYS HERE',
			`day${day},
    // MORE DAYS HERE`
		);

	await promises.writeFile(indexPath, contents);
}
