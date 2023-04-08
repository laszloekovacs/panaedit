import { loadProject } from '../store'

const fileOptions = {
	types: [
		{
			description: 'json document',
			accept: { 'application/json': ['.json'] }
		}
	]
}

type fn = (window: Window, dispatch) => void

export const loadProjectFile: fn = async (window, dispatch) => {
	try {
		const [filehandle] = await window.showOpenFilePicker(fileOptions)

		const file = await filehandle.getFile()
		const text = await file.text()

		if (!file || !text) {
			throw new Error('cannot load file')
		} else {
			const data = JSON.parse(text)
			dispatch(loadProject({ project: data }))
		}
	} catch (error) {
		console.log(error)
	}
}
