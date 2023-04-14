import React from 'react'
import SceneListItem from './SceneListItem'
import { useEditor } from '../hooks/useEditor'
import { useDispatch } from 'react-redux'
import { setActiveScene, triggerRefresh } from '../store'

const SceneList = ({ items }: { items?: string[] }) => {
	const dispatch = useDispatch()
	const { scenes } = useEditor()

	const _items = items || Object.keys(scenes)

	if (_items.length === 0) return null

	const handleClick = (itemKey) => {
		dispatch(setActiveScene({ sceneKey: itemKey }))
		dispatch(triggerRefresh())
	}

	return (
		<div className="mb-4 h-1/2 overflow-y-auto">
			<ul>
				{_items &&
					_items.map((item) => (
						<SceneListItem
							key={item}
							itemKey={item}
							onClick={handleClick}
						/>
					))}
			</ul>
		</div>
	)
}

export default SceneList
