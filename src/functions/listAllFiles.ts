/* find all files in a directory and return an array of full path file names */
export const listAllFiles = async (
	dir: FileSystemDirectoryHandle
): Promise<string[]> => {
	let files: string[] = []

	for await (const entry of dir.values()) {
		if (entry.kind === 'file') {
			files = [...files, entry.name]
		}
	}

	return files
}
