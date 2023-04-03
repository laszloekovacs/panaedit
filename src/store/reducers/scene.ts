import { AnyAction, Reducer } from 'redux'
import stateDefaultState from '../storeDefaultState'

/* restore the project to defaults */
export const resetReducer: Reducer<ProjectState, AnyAction> = (state, action) =>
	stateDefaultState

/* load project from disc */
export const loadSceneReducer = (state, action) => {
	return { project: action.payload }
}

/* add scene */
export const addSceneReducer = (scene, action) => {
	return scene
}

/* remove scene */
export const removeSceneReducer = (scene, action) => {
	return scene
}
