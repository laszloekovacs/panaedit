import React from 'react'
import { useDispatch } from 'react-redux'
import { setActiveScene } from '../store'
import { useEditor } from '../hooks/useEditor'
import flagicon from '../../public/img/flag.svg'
import previewicon from '../../public/img/preview.svg'

type Props = {
	itemKey: string
	onClick?: (sceneKey: string) => void
}

const SceneListItem = ({ itemKey, onClick }: Props) => {
	const { scenes, activeSceneKey, state } = useEditor()
	const scene: Scene = scenes[itemKey]

	return (
		<li
			className="flex flex-row justify-between bg-slate-800 bg-opacity-0 p-1 odd:bg-opacity-20 hover:bg-opacity-40"
			onClick={() => {
				onClick && onClick(itemKey)
			}}
		>
			<div>
				<p>{scene.title}</p>
				<p className="opacity-50">{itemKey}</p>
			</div>
			<div className="flex flex-row">
				<div className="w-6">
					{itemKey == state.default.firstScene && (
						<img src={flagicon} width="20rem" />
					)}
				</div>
				<div className="w-6">
					{activeSceneKey == itemKey && (
						<img src={previewicon} width="20rem" />
					)}
				</div>
			</div>
		</li>
	)
}

export default SceneListItem
