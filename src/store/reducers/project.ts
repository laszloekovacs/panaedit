import { AnyAction, Action } from 'redux'
import stateDefaultState from '../storeDefaultState'
import _ from 'lodash'

/* restore the project to defaults */
export function _reset(state: State) {
	return stateDefaultState
}

/* load project json from disc. Should validate first tho */
export function _loadProject(state: State, action: AnyAction) {
	return action.payload.project
}
