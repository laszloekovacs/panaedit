import React from 'react'
import { useDispatch } from 'react-redux'
import { addScene } from '../../store'

const PanoramaListItem = ({ item }) => {
	const dispatch = useDispatch()

	/* trim path so it look better */
	const filename = item.key.split('/').pop() || item.key

	/* add to project */
	const handleAddToProject = (e) => {
		dispatch(addScene({ sceneKey: item.key, blob: item.value }))
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
