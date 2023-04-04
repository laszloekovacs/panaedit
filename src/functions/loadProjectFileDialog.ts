const fileOptions = {
	types: [{ description: 'json document', accept: { 'application/json': ['.json'] } }]
}

export async function loadProjectFileDialog(): Promise<Object | null> {
	const [filehandle] = await window.showOpenFilePicker(fileOptions)

	const file = await filehandle.getFile()
	const text = await file.text()

	if (!file || !text) {
		return null
	}

	console.log('Project loaded')

	return JSON.parse(text)
}
