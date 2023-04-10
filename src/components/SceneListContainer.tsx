import React from 'react'

import SceneList from './SceneList'
import { useEditor } from '../hooks/useEditor'

/* read the list from the store, render it into a list */
const SceneListContainer = () => {
	const { scenes } = useEditor()

	const items: string[] = Object.keys(scenes)

	if (!items) {
		return <p>no scenes, add some</p>
	} else {
		return <SceneList items={items} />
	}
}

export default SceneListContainer
