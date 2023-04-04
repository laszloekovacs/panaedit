export async function saveProjectFileDialog(text: string) {
	const fileOptions = {
		types: [{ description: 'json document', accept: { 'application/json': ['.json'] } }]
	}

	const filehandle = await window.showSaveFilePicker(fileOptions)
	const writable = await filehandle.createWritable()

	await writable.write(text)
	await writable.close()
}
