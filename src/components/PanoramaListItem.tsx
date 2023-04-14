import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addScene, setActiveScene, setFirstScene } from '../store'
import { useEditor } from '../hooks/useEditor'

type Props = {
	item: CacheLine
	scenes: { [key: string]: Scene }
}

const PanoramaListItem = ({ item }: Props) => {
	const dispatch = useDispatch()

	/* trim path so it look better */
	const filename = item.key.split('/').pop() || item.key
	const key = filename.split('.')[0]

	/* add to project */
	const handleAddToProject = (e) => {
		dispatch(addScene({ path: item.key }))
	}

	const handleSetStart = (e) => {
		dispatch(setFirstScene({ sceneKey: key }))
	}

	return (
		<li className="group relative">
			<div className="relative left-0 top-0 block h-full w-full">
				<img
					className="relative left-0 top-0"
					src={item.value}
					alt={item.key}
				/>
				<p className="relative top-0 z-10 block w-min bg-white bg-opacity-40">
					{filename}
				</p>
				<div className="invisible relative top-0 mx-auto gap-1 hover:visible group-hover:visible">
					<button onClick={handleAddToProject}>add scene</button>
					<button onClick={handleSetStart}>set as start</button>
				</div>
			</div>
		</li>
	)
}

export default PanoramaListItem
