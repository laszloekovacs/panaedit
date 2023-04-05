export const openWorkFiles = async (
	window: Window,
	setFilesMap: (files: Map<string, string>) => void,
	directories: string[]
) => {
	// select the project root folder

	const project = await window.showDirectoryPicker({
		startIn: 'desktop'
	})

	if (!project) return

	const files = new Map<string, string>()

	for (const dir of directories) {
		const handle = await project.getDirectoryHandle(dir, {
			create: false
		})

		if (!handle) {
			throw new Error(`Directory ${dir} not found`)
		}

		/* create url for files. append the path */
		for await (const entry of handle.values()) {
			if (entry.kind === 'file') {
				const f = await entry.getFile()
				const url = URL.createObjectURL(f)
				files.set(`${dir}/${entry.name}`, url)
			}
		}
		console.log(files)
	}

	setFilesMap(files)
}
