import { AnyAction, Action } from 'redux'
import stateDefaultState from '../storeDefaultState'
import _ from 'lodash'

/* 
	add scene. we use the filename as the key in the scene array 
*/
export const _addScene = (state: State, action: AddSceneAction) => {
	const filepath = action.payload.scene.panorama

	// extract filename
	const filename = filepath.split('/').pop()

	// remove extension
	const name = filename?.split('.').shift() || ''

	if (!name) {
		throw new Error('scene has no path or file name')
	}

	// check if scene already exists
	if (state.scenes[name]) {
		throw new Error('scene already exists')
	}

	// add scene to state,
	state.scenes[name] = action.payload.scene

	return state
}

/* 
	remove scene 
*/
export const _removeScene = (state: State, action: RemoveSceneAction) => {
	const key = action.payload.sceneKey

	// check if scene exists
	if (!state.scenes[key]) {
		throw new Error('scene does not exist')
	}

	// remove the scene
	state.scenes = _.omit(state.scenes, key)

	return state
}
