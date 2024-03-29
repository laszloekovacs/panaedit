import _ from 'lodash'

/* add scene. we use the filename as the key in the scene array */
export function _addScene(
	state: State,
	action: {
		payload: {
			path: string
		}
	}
) {
	try {
		const { path } = action.payload

		if (!path) {
			throw new Error('scene has no panorama file path')
		}

		// find the file name from the path, remove file extension
		// having '.' in the key makes lodash create more nested objects
		const fname = _.last(path.split('/'))
		const key = _.first(fname?.split('.'))

		if (!key) {
			throw new Error('invalid panorama name / scene key')
		}

		if (state.scenes[key]) {
			throw new Error('scene already exists')
		}

		// create a new scene
		const scene: Scene = {
			title: path,
			panorama: path,
			hotSpots: [],
			northOffset: 0
		}

		// add scene to state,
		_.set(state.scenes, key, scene)

		// if firstscene and active is not set, set it
		if (!state.default.firstScene) {
			state.default.firstScene = key
			state.editor.activeSceneKey = key
		}

		return state
	} catch (err) {
		console.log(err)
		return state
	}
}

/* remove scene */
export function _removeScene(
	state: State,
	action: {
		payload: {
			sceneKey: string
		}
	}
) {
	const { sceneKey } = action.payload

	if (!state.scenes[sceneKey]) {
		throw new Error('scene does not exist')
	}

	// remove the scene
	state.scenes = _.omit(state.scenes, sceneKey)

	return state
}

/* set the title of the scene */
export function _setSceneTitle(
	state: State,
	action: {
		payload: {
			sceneKey: string
			title: string
		}
	}
) {
	const { sceneKey, title } = action.payload

	if (!state.scenes[sceneKey]) {
		throw new Error('scene does not exist, cannot set title')
	}

	// set the title of the scene
	;(state.scenes[sceneKey] as Scene).title = title

	return state
}

/* set the north offset of the scene */
export function _setSceneNorthOffset(
	state: State,
	action: {
		payload: {
			sceneKey: string
			northOffset: number
		}
	}
) {
	const { sceneKey, northOffset } = action.payload

	if (!state.scenes[sceneKey]) {
		throw new Error('scene does not exist cannot set northOffset')
	}

	// set the north offset of the scene
	;(state.scenes[sceneKey] as Scene).northOffset = northOffset

	return state
}

/* set first scene in the project */
export function _setFirstScene(
	state: State,
	action: {
		payload: {
			sceneKey: string
		}
	}
) {
	const { sceneKey } = action.payload
	console.log(sceneKey)
	if (!(state.scenes as Object).hasOwnProperty(sceneKey)) {
		throw new Error('scene does not exist')
	}

	state.default.firstScene = sceneKey

	return state
}
