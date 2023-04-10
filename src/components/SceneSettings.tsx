import React from 'react'
import { useDispatch } from 'react-redux'
import { setSceneNorthOffset, setSceneTitle } from '../store'
import EditableLabel from './EditableLabel'
import { useEditor } from '../hooks/useEditor'

/* Edit title and north offset of the current scene */
const SceneSettings = () => {
	const dispatch = useDispatch()
	const { scene, activeSceneKey, editor } = useEditor()
	const yaw = editor.yaw

	if (!activeSceneKey) return null

	/* changing the offset */
	const handleSetOffset = (e: unknown) => {
		const offset = {
			sceneKey: activeSceneKey,
			northOffset: Number(yaw.toFixed(2))
		}
		dispatch(setSceneNorthOffset(offset))
	}

	/* changing the scene's title */
	const handleTitleChange = (title: string) => {
		dispatch(setSceneTitle({ sceneKey: activeSceneKey, title }))
	}

	return (
		<div>
			<h2>Scene Settings</h2>
			<p>
				<b>north offset: </b>
				<span>{scene.northOffset}</span>
			</p>

			<EditableLabel value={scene.title} onDoneEditing={handleTitleChange} />
			<button onClick={handleSetOffset}>setFromView</button>
		</div>
	)
}

export default SceneSettings
