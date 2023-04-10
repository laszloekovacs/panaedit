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
		<li
			className="p-1 bg-opacity-0 odd:bg-opacity-20 bg-slate-800 hover:bg-opacity-40"
			onClick={() => handleSelect(itemKey)}
		>
			<p>{scene.title}</p>
			<p className="opacity-50">{itemKey}</p>
		</li>
	)
}

export default SceneListItem
