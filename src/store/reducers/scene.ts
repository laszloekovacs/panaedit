import _ from 'lodash'

/* add scene. we use the filename as the key in the scene array */
export function _addScene(state: State, action: AddSceneAction) {
	const { panorama } = action.payload.scene

	if (!panorama) {
		throw new Error('scene has no path')
	}

	// find the file name from the path, remove file extension
	const regex = /[^/\\]*$/
	const key = panorama.split(regex)[0]
	//const key = f?.split('.')[0]
	err
	if (!key) {
		throw new Error('scene has no path or file name')
	}

	// check if scene already exists
	if (state.scenes[key]) {
		throw new Error('scene already exists')
	}

	// add scene to state,
	_.set(state.scenes, key, action.payload.scene)

	return state
}

/* remove scene */
export function _removeScene(state: State, action: RemoveSceneAction) {
	const key = action.payload.sceneKey

	// check if scene exists
	if (!state.scenes[key]) {
		throw new Error('scene does not exist')
	}

	// remove the scene
	state.scenes = _.omit(state.scenes, key)

	return state
}
