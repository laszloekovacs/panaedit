import React from 'react'
import HotspotList from './HotspotList'
import HotspotAddInfo from './HotspotAddInfo'
import { useSelector } from 'react-redux'

/* container of hotspots */
const Hotspot = () => {
	const scene: Scene = useSelector(
		(state: State) => state.scenes[state.editor.activeScene]
	)

	const { hotSpots } = scene || []

	return (
		<div>
			<h2>Hotspots</h2>
			<HotspotAddInfo />
			{hotSpots && <HotspotList hotspots={hotSpots} />}
		</div>
	)
}

export default Hotspot
