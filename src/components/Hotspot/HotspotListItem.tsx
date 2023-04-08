import React from 'react'

type Props = {
	hotspot: Hotspot
}

const HotspotListItem = ({ hotspot }: Props) => {
	const { sceneId, text, pitch, yaw, type } = hotspot

	return (
		<li>
			<p>
				<span>{sceneId}</span>

				<span>{text}</span>
			</p>
			<p>{type}</p>
			<p>
				<span>{pitch}</span>
				<span>{yaw}</span>
			</p>
		</li>
	)
}

export default HotspotListItem
