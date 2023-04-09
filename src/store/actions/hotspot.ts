import _ from 'lodash'

/* add hotspot */
export function _addHotspot(state: State, action: AddHotspotAction) {
	const { sceneKey, hotspot } = action.payload

	;(state.scenes[sceneKey] as Scene).hotSpots.push(hotspot)

	return state
}

/* remove hotspot with index */
export function _removeHotspot(state: State, action: RemoveHotspotAction) {
	const { sceneKey, hotspotIndex } = action.payload

	if (!state.scenes[sceneKey]) {
		throw new Error('scene does not exist, cannot remove hotspot')
	}

	_.pullAt((state.scenes[sceneKey] as Scene).hotSpots, hotspotIndex)

	return state
}

export function _updateHotspot(state: State, action: UpdateHotspotAction) {
	const { sceneKey, hotspotIndex, hotspot } = action.payload

	if (!state.scenes[sceneKey]) {
		throw new Error('scene does not exist, cannot update hotspot')
	}

	;(state.scenes[sceneKey] as Scene).hotSpots[hotspotIndex] = hotspot

	return state
}
