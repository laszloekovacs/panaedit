import React from 'react'
import { useDispatch } from 'react-redux'
import { addScene, setActiveScene } from '../../store'
import { useEditor as useProject } from '../../hooks'

const PanoramaListItem = ({ item }: { item: CacheLine }) => {
	const dispatch = useDispatch()
	const { scenes } = useProject()

	/* trim path so it look better */
	const filename = item.key.split('/').pop() || item.key

	/* add to project */
	const handleAddToProject = (e) => {
		dispatch(addScene({ path: item.key }))
		/* if this is the first image added, set first scene too */
		if (Object.keys(scenes).length === 1) {
			dispatch(setActiveScene({ sceneKey: item.key }))
		}
	}

	return (
		<li className="border-2 border-solid border-neutral-700 border-opacity-50">
			<div>
				<p>{filename}</p>
				<img src={item.value} alt={item.key} />
			</div>
			<button onClick={handleAddToProject}>add scene</button>
		</li>
	)
}

export default PanoramaListItem
