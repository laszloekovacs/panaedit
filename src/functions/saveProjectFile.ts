export async function saveProjectFile(data: any, window: Window) {
	try {
		const fileOptions = {
			types: [{ description: 'json document', accept: { 'application/json': ['.json'] } }]
		}

		const filehandle = await window.showSaveFilePicker(fileOptions)
		const writable = await filehandle.createWritable()

		const text = JSON.stringify(data)

		await writable.write(text)
		await writable.close()
	} catch (error) {
		console.log(error)
	}
}
