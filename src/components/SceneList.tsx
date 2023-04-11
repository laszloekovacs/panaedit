import React from 'react'
import SceneListItem from './SceneListItem'
import { useEditor } from '../hooks/useEditor'

const SceneList = () => {
	const { scenes } = useEditor()

	const items = Object.keys(scenes)

	if (items.length === 0) return null

	return (
		<div className="mb-4 h-1/2 overflow-y-auto">
			<ul>{items && items.map((item) => <SceneListItem key={item} itemKey={item} />)}</ul>
		</div>
	)
}

export default SceneList
