export const openWorkFiles = async (directories: string[]) => {
	/* user selects the root folder */
	const project = await window.showDirectoryPicker({
		startIn: 'desktop'
	})

	const files = new Map<string, string>()

	if (!project) return files

	for (const dir of directories) {
		const handle = await project.getDirectoryHandle(dir, {
			create: false
		})

		if (!handle) {
			throw new Error(`Directory ${dir} not found`)
		}

		/* for every file, we create a filename, url pair */
		for await (const entry of handle.values()) {
			if (entry.kind === 'file') {
				const f = await entry.getFile()
				const url = URL.createObjectURL(f)
				files.set(`${dir}/${entry.name}`, url)
			}
		}
	}

	return files
}
