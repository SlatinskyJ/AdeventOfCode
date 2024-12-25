export type TRegs = {
	regA: number;
	regB: number;
	regC: number;
	out: number[];
};

export type TProgram = number[];

export type TInstructionResult = {
	regs: TRegs;
	newCounter?: number;
};

export type TInstruction = {
	opcode: number;
	execute: (registers: TRegs, operand: number) => TInstructionResult;
};

export type TProcessor = {
	program: TProgram;
	counter: number;
	instructions: TInstruction[];
	regs: TRegs;
};

function parseProgram(input: string): TProgram {
	return input.match(/\d+/g)!.map(Number);
}

function parseRegisters(input: string): TRegs {
	const numbers = input.match(/\d+/gm)!.map(Number);
	return {
		regA: numbers[0],
		regB: numbers[1],
		regC: numbers[2],
		out: [],
	};
}

export function createProcessor(
	instructions: TInstruction[],
	program: TProgram,
	regs: TRegs
): TProcessor {
	return {
		counter: 0,
		instructions,
		program,
		regs,
	};
}

export function parseInput(input: string): [TRegs, TProgram] {
	const lines = input.split('\n\n');
	const registers = parseRegisters(lines[0]);
	const program = parseProgram(lines[1]);

	return [registers, program];
}

function parseOperand(operand: number, regs: TRegs): number {
	if (operand >= 0 && operand <= 3) {
		return operand;
	}
	if (operand === 4) {
		return regs.regA;
	}
	if (operand === 5) {
		return regs.regB;
	}
	if (operand === 6) {
		return regs.regC;
	}
	if (operand === 7) {
		throw new Error('Operand 7 is unsupported!');
	}

	throw new Error(`Unknown operand!, ${operand}`);
}

const advIns: TInstruction = {
	opcode: 0,
	execute: (regs, operand) => {
		const numerator = regs.regA;
		const denominator = Math.pow(2, parseOperand(operand, regs));
		const result = Math.floor(numerator / denominator);
		return { regs: { ...regs, regA: result } };
	},
};

const bxlIns: TInstruction = {
	opcode: 1,
	execute: (regs, operand) => {
		const result = regs.regB ^ operand;
		return {
			regs: { ...regs, regB: result },
		};
	},
};

const bstIns: TInstruction = {
	opcode: 2,
	execute: (regs, operand) => {
		const result = parseOperand(operand, regs) % 8;
		return { regs: { ...regs, regB: result } };
	},
};

const jnzIns: TInstruction = {
	opcode: 3,
	execute: (regs, operand) => {
		if (regs.regA === 0) {
			return { regs };
		}
		return { regs, newCounter: operand };
	},
};

const bxcIns: TInstruction = {
	opcode: 4,
	execute: (regs) => {
		const result = regs.regB ^ regs.regC;
		return { regs: { ...regs, regB: result } };
	},
};

const outIns: TInstruction = {
	opcode: 5,
	execute: (regs, operand) => {
		const result = parseOperand(operand, regs) % 8;
		return {
			regs: { ...regs, out: [...regs.out, result] },
		};
	},
};

const bdvIns: TInstruction = {
	opcode: 6,
	execute: (regs, operand) => {
		const numerator = regs.regA;
		const denominator = Math.pow(2, parseOperand(operand, regs));
		const result = Math.floor(numerator / denominator);
		return { regs: { ...regs, regB: result } };
	},
};

const cdvIns: TInstruction = {
	opcode: 7,
	execute: (regs, operand) => {
		const numerator = regs.regA;
		const denominator = Math.pow(2, parseOperand(operand, regs));
		const result = Math.floor(numerator / denominator);
		return { regs: { ...regs, regC: result } };
	},
};

export const BASE_INSTRUCTIONS = [
	advIns,
	bxlIns,
	bstIns,
	jnzIns,
	bxcIns,
	outIns,
	bdvIns,
	cdvIns,
];

export function executeProgram(processor: TProcessor): number[] {
	const { program, instructions } = processor;

	let { counter, regs } = processor;
	let instruction: TInstruction | undefined = undefined;
	let operand: number = -1;

	do {
		instruction = instructions.find(
			(ins) => ins.opcode === program[counter]
		);
		operand = program[counter + 1];

		if (!instruction) {
			throw new Error(`Unknown instruction! ${program[counter]}`);
		}
		const { regs: newRegs, newCounter } = instruction.execute(
			regs,
			operand
		);

		regs = newRegs;
		counter = newCounter !== undefined ? newCounter : counter + 2;
	} while (counter < program.length);

	return regs.out;
}
