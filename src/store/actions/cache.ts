import _ from 'lodash'

export function _AddToCache(state: State, action: AddToCacheAction) {
	const { path, blobUrl } = action.payload

	state.cache[path] = blobUrl

	return state
}

export function _ReplaceCache(state: State, action: ReplaceCacheAction) {
	const { map } = action.payload

	state.cache = map

	return state
}
