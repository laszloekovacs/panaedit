import React from 'react'

type Props = {
	hotspot: Hotspot
}

const HotspotListItem = ({ hotspot }: Props) => {
	return <li>{hotspot.sceneId}</li>
}

export default HotspotListItem
