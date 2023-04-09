import React from 'react'

type Props = {
	hotspot: Hotspot
	index: number
}

const HotspotListItem = ({ hotspot, index }: Props) => {
	const { sceneId, text, pitch, yaw, type } = hotspot

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
				<button>remove</button>
			</div>
		</li>
	)
}

export default HotspotListItem
