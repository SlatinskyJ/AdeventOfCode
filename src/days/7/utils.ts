/**
 * Calculates total of numbers with given signs. Always goes from left to right!
 *
 * @param combinations {string} Binary string representing + and * signs where 0's are addition and 1's are multiplication
 * @param numbers {number[]} Numbers to be combined
 *
 * @example calculate('01', [5, 10, 2]) = 5 + 10 * 2 = 30
 *
 * @return {number} Total of addition/multiplication of numbers based on signs
 */
export function calculate(combinations: string, numbers: number[]) {
	const signs = [...combinations];

	return numbers.reduce((acc, number, index) => {
		switch (signs[index - 1]) {
			case '0':
				return acc + number;
			case '1':
				return acc * number;
			case '2':
				return Number(`${acc}${number}`);
			default:
				throw new Error(`Invalid sign: ${signs[index - 1]}`);
		}
	});
}
