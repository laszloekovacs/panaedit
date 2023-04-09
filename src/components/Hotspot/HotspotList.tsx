import React from 'react'
import HotspotListItem from './HotspotListItem'

type Props = {
	hotspots: Hotspot[]
	dispatch: (action) => void
	sceneKey: string
}

const HotspotList = ({ hotspots, dispatch, sceneKey }: Props) => {
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
