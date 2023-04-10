import React from 'react'
import SceneListItem from './SceneListItem'
import { useEditor } from '../hooks/useEditor'

const SceneList = () => {
	const { scenes } = useEditor()
	const items: string[] = Object.keys(scenes)

	return <ul>{items && items.map((item) => <SceneListItem key={item} itemKey={item} />)}</ul>
}

export default SceneList
