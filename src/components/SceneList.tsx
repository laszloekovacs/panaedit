import React from 'react'
import { useEditor } from '../hooks/useEditor'
import { useDispatch } from 'react-redux'
import { setActiveScene, triggerRefresh } from '../store'
import _ from 'lodash'
import SceneListItem from './SceneListItem'

const SceneList = () => {
	const dispatch = useDispatch()
	const { scenes, state, editor } = useEditor()

	if (!Object.keys(scenes)) {
		return null
	}

	const handleChangeActiveScene = (itemKey) => {
		dispatch(setActiveScene({ sceneKey: itemKey }))
		dispatch(triggerRefresh())
	}

	const sceneArray = _.map(scenes, (scene, key) => {
		return {
			title: scene.title,
			sceneKey: key,
			isFirst: state.default.firstScene == key,
			isActive: editor.activeSceneKey == key,
			onClick: handleChangeActiveScene,
			numHotspots: scene.hotSpots.length
		}
	})

	return (
		<ul className="mb-4 h-3/5 overflow-y-auto text-sm">
			{sceneArray &&
				sceneArray.map((item) => (
					<SceneListItem key={item.sceneKey} {...item} />
				))}
		</ul>
	)
}

export default SceneList
