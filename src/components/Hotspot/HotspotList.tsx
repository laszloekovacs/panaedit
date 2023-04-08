import React from 'react'
import HotspotListItem from './HotspotListItem'

type Props = {
	hotspots: Hotspot[]
}

const HotspotList = ({ hotspots }: Props) => {
	return (
		<ul>
			{hotspots.map((hotspot, index) => {
				return <HotspotListItem key={index} hotspot={hotspot} />
			})}
		</ul>
	)
}

export default HotspotList
