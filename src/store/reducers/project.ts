import { AnyAction, Action } from 'redux'
import stateDefaultState from '../storeDefaultState'
import _ from 'lodash'

/* 
	restore the project to defaults 
*/
export const _reset = (state: State) => {
	return stateDefaultState
}

/* 
	load project json from disc. Should validate first tho 
*/
export const _loadProject = (state: State, action: AnyAction) => {
	return action.payload.project
}
