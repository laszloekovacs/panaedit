import React from 'react'
import HotspotList from './HotspotList'
import HotspotAddInfo from './HotspotAddInfo'
import { useDispatch, useSelector } from 'react-redux'
import HotspotAddLink from './HotspotAddLink'
import { useEditor } from '../../hooks'

/* container of hotspots */
const Hotspot = () => {
	const dispatch = useDispatch()
	const { scene, activeSceneKey } = useEditor()

	const { hotSpots } = scene || []

	return (
		<div>
			<h2>Hotspots</h2>
			<HotspotAddInfo />
			<HotspotAddLink />
			{hotSpots && <HotspotList hotspots={hotSpots} sceneKey={activeSceneKey} dispatch={dispatch} />}
		</div>
	)
}

export default Hotspot
