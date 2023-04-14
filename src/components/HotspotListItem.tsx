import React from 'react'
import { removeHotspot, triggerRefresh, updateHotspot } from '../store'
import EditableLabel from './EditableLabel'
import { useDispatch } from 'react-redux'
import pageicon from '../../public/img/page.svg'

type Props = {
	hotspot: Hotspot
	hotspotIndex: number
	sceneKey: string
}

const HotspotListItem = ({ hotspot, hotspotIndex, sceneKey }: Props) => {
	const dispatch = useDispatch()
	const { text, pitch, yaw, type } = hotspot

	const handleRemove = (e) => {
		dispatch(removeHotspot({ sceneKey, hotspotIndex }))
		dispatch(triggerRefresh())
	}

	const handleLabelChange = (text) => {
		const update = { ...hotspot, text: text }

		dispatch(updateHotspot({ sceneKey, hotspotIndex, hotspot: update }))
	}

	return (
		<li className="group m-1 flex flex-row flex-nowrap justify-between bg-slate-900 bg-opacity-30 p-2 text-sm">
			<div>
				<p>
					<span>Label:</span>
					<EditableLabel
						value={text}
						onDoneEditing={handleLabelChange}
					/>
				</p>

				<div className="grid grid-cols-4 gap-x-1">
					<p className="opacity-70">Yaw:</p>
					<p>{yaw}</p>
					<p className="opacity-70">Pitch:</p>
					<p>{pitch}</p>

					{type == 'info' && (
						<>
							<p className="opacity-70">Type:</p>
							<p>{type}</p>
						</>
					)}

					{type == 'scene' && (
						<>
							<p className="opacity-70">Target:</p>
							<p>{type}</p>
						</>
					)}
				</div>
			</div>
			<div className="invisible flex flex-col group-hover:visible">
				<button onClick={handleRemove}>remove</button>
				<button>reposition</button>
				<button>add content</button>
			</div>
		</li>
	)
}

export default HotspotListItem
