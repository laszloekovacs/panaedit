import produce from 'immer'
import { Action, AnyAction } from 'redux'

function cacheReducer(state: State, action: AnyAction) {
	switch (action.type) {
		case 'ADD_TO_CACHE':
			return produce(state, (draft) => {
				const { key, value } = action.payload
				draft.cache.set(key, value)
			})

		default:
			return state
	}
}

export default cacheReducer
