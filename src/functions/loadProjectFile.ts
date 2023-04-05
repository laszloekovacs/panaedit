import { loadProject } from '../store'

const fileOptions = {
	types: [{ description: 'json document', accept: { 'application/json': ['.json'] } }]
}

export async function loadProjectFile(window, dispatch) {
	const [filehandle] = await window.showOpenFilePicker(fileOptions)

	const file = await filehandle.getFile()
	const text = await file.text()

	if (!file || !text) {
		throw new Error('cannot load file')
	}

	const data = JSON.parse(text)
	dispatch(loadProject(data))
}
