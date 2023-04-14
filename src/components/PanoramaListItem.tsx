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

	/* trim path so it look better, create key from path */
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
		<li className="group">
			<div className="relative isolate">
				<img className="z-0" src={item.value} alt={item.key} />
				<p className="absolute left-0 top-0 z-40 bg-white bg-opacity-40">
					{filename}
				</p>
				<div className="z-60 invisible absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center hover:visible group-hover:visible">
					<button onClick={handleAddToProject}>add scene</button>
					<button onClick={handleSetStart}>set as start</button>
				</div>
			</div>
		</li>
	)
}

export default PanoramaListItem
