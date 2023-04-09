import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSceneNorthOffset, setSceneTitle } from '../../store'
import EditableLabel from '../EditableLabel/EditableLabel'

/* Edit title and north offset of the current scene */
const SceneSettings = () => {
	const dispatch = useDispatch()
	const yaw: number = useSelector((state: State) => state.editor.yaw)
	const sceneKey: string = useSelector(
		(state: State) => state.editor.activeScene
	)
	const scene: Scene = useSelector(
		(state: State) => state.scenes[state.editor.activeScene]
	)

	if (!sceneKey) return null

	/* changing the offset */
	const handleSetOffset = (e: unknown) => {
		const offset = {
			sceneKey: sceneKey,
			northOffset: Number(yaw.toFixed(2))
		}
		dispatch(setSceneNorthOffset(offset))
	}

	/* changing the scene's title */
	const handleTitleChange = (newTitle: string) => {
		dispatch(setSceneTitle({ sceneKey, title: newTitle }))
	}

	return (
		<div>
			<h2>SceneSettings</h2>
			<p>
				<b>north offset: </b>
				<span>{scene.northOffset}</span>
			</p>

			<EditableLabel
				value={scene.title}
				onDoneEditing={handleTitleChange}
			/>
			<button onClick={handleSetOffset}>setFromView</button>
		</div>
	)
}

export default SceneSettings
