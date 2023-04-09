import _ from 'lodash'

/* add scene. we use the filename as the key in the scene array */
export function _addScene(state: State, action: AddSceneAction) {
	const { sceneKey, blob } = action.payload

	if (!sceneKey) {
		throw new Error('scene has no panorama file path')
	}

	// find the file name from the path, remove file extension
	// having '.' in the key makes lodash create more nested objects
	const fname = _.last(sceneKey.split('/'))
	const key = _.first(fname?.split('.'))

	if (!key) {
		throw new Error('invalid panorama name / scene key')
	}

	if (state.scenes[key]) {
		throw new Error('scene already exists')
	}

	// create a new scene
	const scene: Scene = {
		title: key,
		panorama: blob,
		hotSpots: [],
		northOffset: 0
	}

	// add scene to state,
	_.set(state.scenes, key, scene)

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

/* set the title of the scene */
export function _setSceneTitle(state: State, action: SetSceneTitleAction) {
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
	action: SetSceneNorthOffsetAction
) {
	const { sceneKey, northOffset } = action.payload

	if (!state.scenes[sceneKey]) {
		throw new Error('scene does not exist cannot set northOffset')
	}

	// set the north offset of the scene
	;(state.scenes[sceneKey] as Scene).northOffset = northOffset

	return state
}
