import stateDefaultState from '../storeDefaultState'

/* restore the project to defaults */
export function _reset(state: State) {
	return stateDefaultState
}

/* load project json from disc. Should validate first tho */
export function _loadProject(state: State, action: LoadProjectAction) {
	return action.payload.project
}
