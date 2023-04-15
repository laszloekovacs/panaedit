import React from 'react'
import SceneListItem from './SceneListItem'
import { useEditor } from '../hooks/useEditor'
import _ from 'lodash'

const LinkSceneList = ({ onClick }) => {
	const { state, scenes, activeSceneKey } = useEditor()

	const list = _.map(scenes, (scene, key) => {
		return {
			title: scene.title,
			sceneKey: key,
			isFirst: state.default.firstScene == key,
			isActive: activeSceneKey == key,
			onClick: onClick,
			numHotspots: scene.hotSpots.length
		}
	}).filter((item) => item.isActive == false)

	return (
		<ul>
			{list &&
				list.map((item) => (
					<SceneListItem key={item.sceneKey} {...item} />
				))}
		</ul>
	)
}

export default LinkSceneList
