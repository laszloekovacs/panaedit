export async function saveProjectFileDialog(project: object): Promise<void> {
	const fileOptions = {
		types: [{ description: 'json document', accept: { 'application/json': ['.json'] } }]
	}

	const filehandle = await window.showSaveFilePicker(fileOptions)
	const writable = await filehandle.createWritable()

	await writable.write(JSON.stringify(project))
	await writable.close()

	console.log('Project saved')
}
