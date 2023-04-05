// presents file dialog, returns directory handles
export async function selectWorkFolder(window, setFolders) {
	try {
		const project = await window.showDirectoryPicker({
			startIn: 'desktop'
		})

		if (!project) return

		const panoramas = await project.getDirectoryHandle('panoramas', { create: false })
		const photos = await project.getDirectoryHandle('photos', { create: false })
		const articles = await project.getDirectoryHandle('articles', { create: false })

		if (!panoramas || !photos || !articles) {
			throw new Error('Missing folders in project directory')
		}

		setFolders({
			project,
			panoramas,
			photos,
			articles
		})
	} catch (err) {
		throw err
	}
}
