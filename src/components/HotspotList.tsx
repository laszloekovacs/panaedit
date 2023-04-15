import React from 'react'
import HotspotListItem from './HotspotListItem'

const HotspotList = ({ hotspots, sceneKey }) => {
	return (
		<ul id="HotspotList" className="h-full overflow-y-auto pb-1">
			{hotspots.map((hotspot, index) => {
				return (
					<HotspotListItem
						key={index}
						hotspot={hotspot}
						hotspotIndex={index}
						sceneKey={sceneKey}
					/>
				)
			})}
		</ul>
	)
}

export default HotspotList
