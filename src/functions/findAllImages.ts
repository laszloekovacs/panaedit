export async function findAllImages(folder: FileSystemDirectoryHandle) {
	if (!folder) return []

	let paths: string[] = []
	for await (let entries of folder.values()) {
		if (entries.kind === 'file') {
			paths.push(entries.name)
		}
	}

	/* filter out non images */
	const regex = /(\.jpg|\.jpeg|\.png)$/i
	paths.filter((path) => regex.test(path))

	return paths
}
