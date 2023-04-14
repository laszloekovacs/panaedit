import React from 'react'
import { useDispatch } from 'react-redux'
import { setActiveScene } from '../store'
import { useEditor } from '../hooks/useEditor'

type Props = {
	itemKey: string
	onClick?: (sceneKey: string) => void
}

const SceneListItem = ({ itemKey, onClick }: Props) => {
	const { scenes } = useEditor()
	const scene: Scene = scenes[itemKey]

	return (
		<li
			className="bg-slate-800 bg-opacity-0 p-1 odd:bg-opacity-20 hover:bg-opacity-40"
			onClick={() => {
				onClick && onClick(itemKey)
			}}
		>
			<p>{scene.title}</p>
			<p className="opacity-50">{itemKey}</p>
		</li>
	)
}

export default SceneListItem
