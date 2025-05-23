import React from 'react'
import { useDispatch } from 'react-redux'
import { setSceneNorthOffset, setSceneTitle } from '../store'
import EditableLabel from './EditableLabel'
import { useEditor } from '../hooks/useEditor'

/* Edit title and north offset of the current scene */
const SceneSettings = () => {
	const dispatch = useDispatch()
	const { scenes, scene, activeSceneKey, editor } = useEditor()
	const yaw = editor.yaw

	if (Object.keys(scenes).length === 0) return null

	/* changing the offset */
	const handleSetOffset = () => {
		// Format yaw value for consistency
		const normalizedYaw = Number(yaw.toFixed(2));
		
		// Calculate northOffset properly
		// In Pannellum, northOffset is the negative of the yaw you want to be north
		const payload = {
		  sceneKey: activeSceneKey,
		  northOffset: normalizedYaw
		}
		
		dispatch(setSceneNorthOffset(payload));
		// Also trigger a refresh to ensure the scene reloads
		dispatch(triggerRefresh());
	  }

	/* changing the scene's title */
	const handleTitleChange = (title: string) => {
		const payload = {
			sceneKey: activeSceneKey,
			title
		}

		dispatch(setSceneTitle(payload))
	}

	return (
		<div className="mb-4">
			<h2>Scene Settings</h2>

			<p className="flex flex-row flex-nowrap">
				<b>title: </b>
				<EditableLabel
					value={scene.title}
					onDoneEditing={handleTitleChange}
				/>
			</p>

			<div className="flex flex-row justify-between">
				<p>
					<span className="font-bold">north offset:</span>
					<span>{scene.northOffset}</span>
				</p>
				<button onClick={handleSetOffset}>set</button>
			</div>
		</div>
	)
}

export default SceneSettings
