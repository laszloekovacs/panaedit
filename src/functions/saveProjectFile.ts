const fileOptions = {
	types: [
		{
			description: 'json document',
			accept: { 'application/json': ['.json'] }
		}
	]
}

export async function saveProjectFile(data: State, window: Window) {
	try {
		const filehandle = await window.showSaveFilePicker(fileOptions)
		const writable = await filehandle.createWritable()

		// Create a clean copy of the state without the cache
		const cleanData = {
			...data,
			cache: [] // Save with empty cache to avoid blob URL reference issues
		}

		// Convert to JSON with pretty formatting
		const text = JSON.stringify(cleanData, null, 2)

		await writable.write(text)
		await writable.close()
		
		console.log("Project saved successfully (without cache)")
	} catch (error) {
		console.log("Error saving project:", error)
	}
}