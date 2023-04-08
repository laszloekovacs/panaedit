import React from 'react'

type Props = {
	hotspot: Hotspot
}

const HotspotListItem = ({ hotspot }: Props) => {
	return (
		<li>
			<p>{hotspot.sceneId}</p>
		</li>
	)
}

export default HotspotListItem
