import React from 'react'
import SceneListItem from './SceneListItem'
import { useEditor } from '../hooks/useEditor'

const SceneList = () => {
	const { scenes } = useEditor()
	const items: string[] = Object.keys(scenes)

	return (
		<div className="mb-4 h-64 overflow-y-auto">
			<ul>{items && items.map((item) => <SceneListItem key={item} itemKey={item} />)}</ul>
		</div>
	)
}

export default SceneList
