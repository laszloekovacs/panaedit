import React from 'react'
import { useDispatch } from 'react-redux'
import { addScene, setActiveScene } from '../store'
import { useEditor as useProject } from '../hooks'

const PanoramaListItem = ({ item }: { item: CacheLine }) => {
	const dispatch = useDispatch()
	const { scenes } = useProject()

	/* trim path so it look better */
	const filename = item.key.split('/').pop() || item.key

	/* add to project */
	const handleAddToProject = (e) => {
		dispatch(addScene({ path: item.key }))
	}

	return (
		<li className="isolate relative">
			<p className="z-10 block w-min absolute top-0 bg-white bg-opacity-40">{filename}</p>
			<img className="peer" src={item.value} alt={item.key} />
			<div className="bottom-0 gap-1 absolute hover:visible peer-hover:visible invisible mx-auto">
				<button onClick={handleAddToProject}>add scene</button>
				<button>set as start</button>
				<button>remove</button>
			</div>
		</li>
	)
}

export default PanoramaListItem
