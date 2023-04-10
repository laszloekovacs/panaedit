import React from 'react'
import { useDispatch } from 'react-redux'
import { addScene, setActiveScene } from '../store'
import { useEditor as useProject } from '../hooks'
import style from './Panorama.module.scss'

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
		<li className={style.PanoramaListItem}>
			<div>
				<p>{filename}</p>
				<img src={item.value} alt={item.key} />
			</div>
			<button onClick={handleAddToProject}>add scene</button>
		</li>
	)
}

export default PanoramaListItem
