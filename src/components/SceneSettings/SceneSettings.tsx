import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSceneNorthOffset } from '../../store'

/* Edit title and north offset of the current scene */
const SceneSettings = () => {
	const dispatch = useDispatch()
	const sceneKey = useSelector((state: State) => state.editor.activeScene)
	const scene: Scene = useSelector(
		(state: State) => state.scenes[state.editor.activeScene]
	)

	if (!scene) return null

	const handleSetOffset = (e: unknown) => {
		const payload = {
			sceneKey: sceneKey,
			northOffset: 0
		}

		dispatch(setSceneNorthOffset(payload))
	}

	return (
		<div>
			<h2>SceneSettings</h2>
			<p>
				<b>north offset: </b>
				<span>{scene.northOffset}</span>
			</p>

			<button onClick={handleSetOffset}>setFromView</button>
		</div>
	)
}

export default SceneSettings
