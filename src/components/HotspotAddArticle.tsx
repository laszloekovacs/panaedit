import React from 'react'
import { useDispatch } from 'react-redux'
import { addHotspot, triggerRefresh } from '../store'
import { useEditor } from '../hooks/useEditor'

const HotspotAddArticle = () => {
	const dispatch = useDispatch()
	const { activeSceneKey, editor } = useEditor()

	const handleAddArticle = (e) => {
		const hotspot: Hotspot = {
			type: 'article',
			yaw: editor.yaw,
			pitch: editor.pitch,
			text: 'new article',
			targetYaw: 'sameAzimuth'
		}

		dispatch(addHotspot({ sceneKey: activeSceneKey, hotspot }))
		dispatch(triggerRefresh())
	}

	return (
		<div className="flex flex-row">
			<button onClick={handleAddArticle}>add hotspot</button>
		</div>
	)
}

export default HotspotAddArticle
