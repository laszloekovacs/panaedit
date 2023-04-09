import React from 'react'
import { removeHotspot } from '../../store'

type Props = {
	hotspot: Hotspot
	hotspotIndex: number
	dispatch: (action) => void
	sceneKey: string
}

const HotspotListItem = ({
	hotspot,
	hotspotIndex,
	sceneKey,
	dispatch
}: Props) => {
	const { sceneId, text, pitch, yaw, type } = hotspot

	const handleRemove = (e) => {
		dispatch(removeHotspot({ sceneKey, hotspotIndex }))
	}

	return (
		<li className="m-1 flex flex-row flex-nowrap bg-slate-900 bg-opacity-30 p-2">
			<div>
				<table>
					<tbody>
						<tr>
							<th>Yaw: </th>
							<td>{yaw}</td>
							<th>Pitch: </th>
							<td>{pitch}</td>
						</tr>
						<tr>
							<th>Type: </th>
							<td>{type}</td>
							<th>Id: </th>
							<td>{sceneId}</td>
						</tr>
					</tbody>
				</table>
				<p>
					<b>Label: </b>
					{text}
				</p>
			</div>
			<div>
				<button onClick={handleRemove}>remove</button>
			</div>
		</li>
	)
}

export default HotspotListItem
