import React from 'react'
import HotspotList from './HotspotList'
import HotspotAddInfo from './HotspotAddInfo'
import { useDispatch, useSelector } from 'react-redux'
import HotspotAddLink from './HotspotAddLink'

/* container of hotspots */
const Hotspot = () => {
	const dispatch = useDispatch()
	const scene: Scene = useSelector(
		(state: State) => state.scenes[state.editor.activeScene]
	)
	const sceneKey = useSelector((state: State) => state.editor.activeScene)

	const { hotSpots } = scene || []

	return (
		<div>
			<h2>Hotspots</h2>
			<HotspotAddInfo />
			<HotspotAddLink />
			{hotSpots && (
				<HotspotList
					hotspots={hotSpots}
					sceneKey={sceneKey}
					dispatch={dispatch}
				/>
			)}
		</div>
	)
}

export default Hotspot
