import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addHotspot } from '../../store'

const HotspotAddInfo = () => {
	const dispatch = useDispatch()
	const editor = useSelector((state: State) => state.editor)

	const handleAddInfo = (e) => {
		console.log('add info')
		const hotspot: Hotspot = {
			type: 'info',
			yaw: editor.yaw,
			pitch: editor.pitch,
			text: 'new info',
			targetYaw: 'sameAzimuth'
		}

		dispatch(addHotspot({ sceneKey: editor.activeScene, hotspot }))
	}

	return (
		<div className="flex flex-row">
			<button onClick={handleAddInfo}>add hotspot</button>
		</div>
	)
}

export default HotspotAddInfo
