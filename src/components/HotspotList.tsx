import React from 'react'
import HotspotListItem from './HotspotListItem'

const HotspotList = ({ hotspots, dispatch, sceneKey }) => {
	return (
		<ul className="border-1">
			{hotspots.map((hotspot, index) => {
				return (
					<HotspotListItem
						key={index}
						hotspot={hotspot}
						hotspotIndex={index}
						dispatch={dispatch}
						sceneKey={sceneKey}
					/>
				)
			})}
		</ul>
	)
}

export default HotspotList