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

		const text = JSON.stringify(data, null, 2)

		await writable.write(text)
		await writable.close()
	} catch (error) {
		console.log(error)
	}
}
