import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SceneList from './SceneList'
import { setActiveScene } from '../../store'
import _, { values } from 'lodash'
import { scenesToArray } from './scenesToArray'

/* read the list from the store, render it into a list */
const SceneListContainer = () => {
	const scenes = useSelector((s: State) => s.scenes)
	const dispatch = useDispatch()

	if (!Object.keys(scenes)) return <p>no scenes, add some</p>

	const items = scenesToArray(scenes)

	console.log(items)

	const handleSelect = (key: string) => {
		dispatch(setActiveScene({ sceneKey: key }))
	}

	return <SceneList items={items} onClick={handleSelect} />
}

export default SceneListContainer
