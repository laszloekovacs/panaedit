import stateDefaultState from '../storeDefaultState'

/* restore the project to defaults */
export function _reset(state: State) {
	return stateDefaultState
}

/* load project json from disc. Should validate first tho */
export function _loadProject(state: State, action: LoadProjectAction) {
	return action.payload.project
}

/* set first scene in the project */
export function _setFirstScene(state: State, action: SetFirstSceneAction) {
	const { sceneKey } = action.payload

	if (!state.scenes[sceneKey]) {
		throw new Error('scene does not exist')
	}

	state.default.firstScene = sceneKey

	return state
}
