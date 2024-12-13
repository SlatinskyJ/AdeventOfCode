export type TBlock = {
	size: number;
	id?: number;
};

export type TDisk = TBlock[];

export function getRealRepresentation(input: string): TDisk {
	const chars = [...input];
	const disk: TDisk = [];

	for (let i = 0; i < chars.length; i++) {
		if (chars[i] !== '0') {
			if (i % 2 === 0) {
				// is file
				disk.push({ size: Number(chars[i]), id: i / 2 });
			} else {
				// is free space
				disk.push({ size: Number(chars[i]) });
			}
		}
	}

	return disk;
}

export function cleanUpDisk(disk: TDisk): TDisk {
	for (let i = 1; i < disk.length; i++) {
		if (disk[i - 1].id === disk[i].id) {
			//merge
			disk[i].size += disk[i - 1].size;
			disk[i - 1].size = 0;
		}
	}
	return disk.filter((block) => block.size !== 0);
}

export function compactDisk(disk: TDisk): TDisk {
	const firstFree = disk.findIndex(isBlockFreeSpace);
	const lastFull = disk.findLastIndex((block) => !isBlockFreeSpace(block));

	if (firstFree === disk.length - 1) {
		return disk;
	}

	if (disk[lastFull].size === disk[firstFree].size) {
		//can be swapped!
		disk[firstFree].id = disk[lastFull].id;
		delete disk[lastFull].id;
	} else if (disk[lastFull].size < disk[firstFree].size) {
		// fits
		disk[firstFree].id = disk[lastFull].id;
		delete disk[lastFull].id;
		disk.splice(firstFree + 1, 0, {
			size: disk[firstFree].size - disk[lastFull].size,
		});
		disk[firstFree].size = disk[lastFull + 1].size;
	} else {
		// needs more work
		disk[lastFull].size -= disk[firstFree].size;
		if (disk[disk.length - 1].id === undefined) {
			disk[disk.length - 1].size += disk[firstFree].size;
		} else {
			disk.push({ size: disk[firstFree].size });
		}
		disk[firstFree].id = disk[lastFull].id;
	}

	return compactDisk(cleanUpDisk(disk));
}

function calculateHash(
	{ acc, myI }: { acc: number; myI: number },
	{ size, id }: TBlock
): { acc: number; myI: number } {
	if (id === undefined) {
		return { acc, myI: myI + size };
	}

	const sum = size * ((myI + myI + size - 1) / 2);

	return { acc: acc + sum * id, myI: myI + size };
}

export function calculateHashSum(disk: TDisk): number {
	const { acc: hashSum } = disk.reduce(calculateHash, { acc: 0, myI: 0 });

	return hashSum;
}

export function isBlockFreeSpace(block: TBlock): boolean {
	return typeof block.id !== 'number';
}

export function compactFiles(disk: TDisk): TDisk {
	for (let i = 0; i < disk.length; i++) {
		const index = disk.length - i - 1;
		const block = disk[index];

		if (!isBlockFreeSpace(block)) {
			const freeIndex = disk.findIndex(
				(val) => isBlockFreeSpace(val) && val.size >= block.size
			);
			if (freeIndex !== -1 && freeIndex < index) {
				// console.log('swapping', disk, index, freeIndex);
				disk = cleanUpDisk(swap(disk, index, freeIndex));
				// console.log(disk, '\n\n\n');
			}
		}
	}

	return cleanUpDisk(disk);
}

export function swap(
	disk: TDisk,
	fullBlockIndex: number,
	emptyBlockIndex: number
): TDisk {
	if (disk[fullBlockIndex].size === disk[emptyBlockIndex].size) {
		//can be swapped!
		disk[emptyBlockIndex].id = disk[fullBlockIndex].id;
		delete disk[fullBlockIndex].id;
	} else if (disk[fullBlockIndex].size < disk[emptyBlockIndex].size) {
		// fits
		disk[emptyBlockIndex].id = disk[fullBlockIndex].id;
		delete disk[fullBlockIndex].id;
		disk.splice(emptyBlockIndex + 1, 0, {
			size: disk[emptyBlockIndex].size - disk[fullBlockIndex].size,
		});
		disk[emptyBlockIndex].size = disk[fullBlockIndex + 1].size;
	}

	return cleanUpDisk(disk);
}
