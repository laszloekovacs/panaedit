import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addScene, setActiveScene, setFirstScene } from '../store'
import { useEditor } from '../hooks/useEditor'

type Props = {
	item: CacheLine
	scenes: { [key: string]: Scene }
}

const PanoramaListItem = ({ item, scenes }: Props) => {
	const dispatch = useDispatch()

	/* trim path so it look better */
	const filename = item.key.split('/').pop() || item.key

	/* add to project */
	const handleAddToProject = (e) => {
		dispatch(addScene({ path: item.key }))
	}

	/* check if its already added to the scene */

	const isAdded = (scenes as Object).hasOwnProperty(item.key)

	return (
		<li
			className={
				'relative isolate border-2' +
				' ' +
				(isAdded ? 'border-orange-700' : 'border-gray-200')
			}
		>
			<p className="absolute top-0 z-10 block w-min bg-white bg-opacity-40">
				{filename}
			</p>
			<img className="peer" src={item.value} alt={item.key} />
			<div className="invisible absolute bottom-0 mx-auto gap-1 hover:visible peer-hover:visible">
				<button onClick={handleAddToProject}>add scene</button>
				<button>set as start</button>
			</div>
		</li>
	)
}

export default PanoramaListItem
