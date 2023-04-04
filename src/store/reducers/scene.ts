import _ from 'lodash'

/* add scene. we use the filename as the key in the scene array */
export function _addScene(state: State, action: AddSceneAction) {
	const { panorama } = action.payload.scene

	if (!panorama) {
		throw new Error('scene has no panorama file path')
	}

	// find the file name from the path, remove file extension
	// having '.' in the key makes lodash create more nested objects
	const fname = _.last(panorama.split('/'))
	const key = _.first(fname?.split('.'))

	if (!key) {
		throw new Error('invalid panorama name / scene key')
	}

	if (state.scenes[key]) {
		throw new Error('scene already exists')
	}

	// add scene to state,
	_.set(state.scenes, key, action.payload.scene)

	return state
}

/* remove scene */
export function _removeScene(state: State, action: RemoveSceneAction) {
	const { sceneKey } = action.payload

	if (!state.scenes[sceneKey]) {
		throw new Error('scene does not exist')
	}

	// remove the scene
	state.scenes = _.omit(state.scenes, sceneKey)

	return state
}
