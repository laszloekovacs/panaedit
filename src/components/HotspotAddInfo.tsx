import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addHotspot } from '../store'
import { useEditor } from '../hooks'

const HotspotAddInfo = () => {
	const dispatch = useDispatch()
	const { activeSceneKey, editor } = useEditor()

	const handleAddInfo = (e) => {
		const hotspot: Hotspot = {
			type: 'info',
			yaw: editor.yaw,
			pitch: editor.pitch,
			text: 'new info',
			targetYaw: 'sameAzimuth'
		}

		dispatch(addHotspot({ sceneKey: activeSceneKey, hotspot }))
	}

	return (
		<div className="flex flex-row">
			<button onClick={handleAddInfo}>add hotspot</button>
		</div>
	)
}

export default HotspotAddInfo
