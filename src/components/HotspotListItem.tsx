import React from 'react'
import { removeHotspot, triggerRefresh, updateHotspot } from '../store'
import EditableLabel from './EditableLabel'
import { useDispatch } from 'react-redux'
import pageicon from '../../public/img/page.svg'
import { useEditor } from '../hooks/useEditor'

type Props = {
	hotspot: Hotspot
	hotspotIndex: number
	sceneKey: string
}

const HotspotListItem = ({ hotspot, hotspotIndex, sceneKey }: Props) => {
	const dispatch = useDispatch()
	const { editor } = useEditor()
	const { text, pitch, yaw, type } = hotspot

	/* remove hotspot */
	const handleRemove = (e) => {
		dispatch(removeHotspot({ sceneKey, hotspotIndex }))
		dispatch(triggerRefresh())
	}

	/* change text of the hotspot */
	const handleLabelChange = (text) => {
		const update = { ...hotspot, text: text }
		dispatch(updateHotspot({ sceneKey, hotspotIndex, hotspot: update }))
	}

	const handleReposition = () => {
		const { yaw, pitch } = editor

		dispatch(
			updateHotspot({
				sceneKey,
				hotspotIndex,
				hotspot: { ...hotspot, yaw, pitch }
			})
		)

		dispatch(triggerRefresh())
	}

	return (
		<li className="group m-1 flex flex-row flex-nowrap justify-between bg-slate-900 bg-opacity-30 p-2 text-sm">
			<div>
				<EditableLabel value={text} onDoneEditing={handleLabelChange} />

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
				<button onClick={handleReposition}>reposition</button>
			</div>
		</li>
	)
}

export default HotspotListItem
