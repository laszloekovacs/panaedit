import React from 'react'
import HotspotList from './HotspotList'

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
	return <HotspotList hotspots={hotspots} />
}

export default Hotspot
