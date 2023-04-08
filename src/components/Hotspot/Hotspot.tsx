import React from 'react'
import HotspotList from './HotspotList'
import HotspotAddInfo from './HotspotAddInfo'

const hotspots: Hotspot[] = [
	{
		sceneId: 'scene1',
		pitch: 0,
		yaw: 0,
		type: 'info',
		text: 'This is a hotspot'
	}
]

const Hotspot = () => {
	return (
		<div>
			<h2>Hotspots</h2>
			<HotspotAddInfo />
			<HotspotList hotspots={hotspots} />
		</div>
	)
}

export default Hotspot
