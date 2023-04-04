// presents file dialog, returns directory handles
export async function selectWorkFolder(): Promise<Folders | null> {
	const project = await window.showDirectoryPicker({
		startIn: 'desktop'
	})

	if (!project) return null

	const panoramas = await project.getDirectoryHandle('panoramas', { create: false })
	const photos = await project.getDirectoryHandle('photos', { create: false })
	const articles = await project.getDirectoryHandle('articles', { create: false })

	if (!panoramas || !photos || !articles) {
		throw new Error('Missing folders in project directory')
	}

	return {
		project,
		panoramas,
		photos,
		articles
	} as Folders
}
