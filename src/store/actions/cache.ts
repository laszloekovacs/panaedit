import _ from 'lodash'
import { AnyAction } from 'redux'

export function _AddToCache(
	state: State,
	action: {
		payload: {
			key: string
			value: string
		}
	}
) {
	const { key, value } = action.payload

	state.cache[key] = value

	return state
}

export function _ReplaceCache(state: State, action: { payload: { map: CacheLine[] } }) {
	const { map } = action.payload

	state.cache = map

	return state
}
