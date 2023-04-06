import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SceneListItem from './SceneListItem'

/* read the list from the store, render it into a list */
const SceneList = () => {
	const scenes = useSelector((s: State) => s.scenes)
	const dispatch = useDispatch()

	const keys = Object.keys(scenes)
	const items = Object.values(scenes) as Scene[]

	if (keys.length === 0) return <div>no scenes</div>

	return (
		<div>
			<ul>
				{items.map((item, i) => (
					<SceneListItem key={item.} item={item} />
				))}
			</ul>
		</div>
	)
}

export default SceneList
