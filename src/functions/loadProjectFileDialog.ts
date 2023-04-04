const fileOptions = {
	types: [{ description: 'json document', accept: { 'application/json': ['.json'] } }]
}

export async function loadProjectFileDialog() {
	const [filehandle] = await window.showOpenFilePicker(fileOptions)

	const file = await filehandle.getFile()
	const text = await file.text()

	if (!file || !text) return

	console.log(JSON.parse(text))

	return JSON.parse(text)
}
