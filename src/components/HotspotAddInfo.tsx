import React from 'react'
import { useDispatch } from 'react-redux'
import { addHotspot, triggerRefresh } from '../store'
import { useEditor } from '../hooks/useEditor'

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
		dispatch(triggerRefresh())
	}

	return (
		<div className="flex flex-row">
			<button onClick={handleAddInfo}>add hotspot</button>
		</div>
	)
}

export default HotspotAddInfo
