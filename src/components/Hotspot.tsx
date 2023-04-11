import React from 'react'
import HotspotList from './HotspotList'
import HotspotAddInfo from './HotspotAddInfo'
import { useDispatch } from 'react-redux'
import HotspotAddLink from './HotspotAddLink'
import { useEditor } from '../hooks/useEditor'

/* container of hotspots */
const Hotspot = () => {
	const dispatch = useDispatch()
	const { scene, activeSceneKey } = useEditor()

	const { hotSpots } = scene || []

	return (
		<>
			<h2>Hotspots</h2>
			<div className="flex flex-row justify-between pb-2">
				<HotspotAddInfo />
				<HotspotAddLink />
			</div>
			{hotSpots && <HotspotList hotspots={hotSpots} sceneKey={activeSceneKey} dispatch={dispatch} />}
		</>
	)
}

export default Hotspot
