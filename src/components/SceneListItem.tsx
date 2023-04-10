import React from 'react'
import { useDispatch } from 'react-redux'
import { setActiveScene } from '../store'
import { useEditor } from '../hooks/useEditor'

const SceneListItem = ({ itemKey }: { itemKey: string }) => {
	const dispatch = useDispatch()
	const { scenes } = useEditor()

	const scene: Scene = scenes[itemKey]

	/* user clicked on the list item */
	const handleSelect = (sceneKey: string) => {
		dispatch(setActiveScene({ sceneKey }))
	}

	return (
		<li className="border-2 border-gray-300 " onClick={() => handleSelect(itemKey)}>
			<p>{itemKey}</p>
		</li>
	)
}

export default SceneListItem
