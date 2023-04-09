import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SceneList from './SceneList'
import { setActiveScene } from '../../store'
import { scenesToArray } from './scenesToArray'
import { useEditor } from '../../hooks'

/* read the list from the store, render it into a list */
const SceneListContainer = () => {
	const { scenes } = useEditor()
	const dispatch = useDispatch()

	if (!Object.keys(scenes)) return <p>no scenes, add some</p>

	const items = scenesToArray(scenes)

	/* user clicked on the list item */
	const handleSelect = (key: string) => {
		dispatch(setActiveScene({ sceneKey: key }))
	}

	return <SceneList items={items} onClick={handleSelect} />
}

export default SceneListContainer
