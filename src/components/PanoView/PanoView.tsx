import React, { useContext, useEffect } from 'react'
import PanoList from './PanoList'
import { FoldersContext } from '../FoldersProvider/FoldersProvider'
import { filteredMapToObjArray } from './filteredMapToObjArray'
import { useDispatch } from 'react-redux'
import { addScene } from '../../store'

/* show all panoramas in the panorama folder, click to add
todo: add loading indicator, it seems its needed
*/

const PanoView = () => {
	const filemap = useContext<Map<string, string>>(FoldersContext)
	const dispatch = useDispatch()

	/* selection */
	const [selected, setSelected] = React.useState<string[]>([])

	/* toggle selection of files */
	const handleSelect = (item: string) => {
		if (selected.includes(item)) {
			setSelected(selected.filter((i) => i !== item))
			console.log('removed ', item)
		} else {
			setSelected([...selected, item])
			console.log('added ', item)
		}
	}

	/* build the list of panoramas to render */
	const items = filteredMapToObjArray(filemap, /^panorama/)

	const handleCreateScenes = () => {
		console.log('create scenes')

		/* loop trough selections */
		selected.forEach((item) => {
			/* create a scene object */
			const scene: Scene = {
				title: item,
				panorama: item,
				northOffset: 0,
				hotSpots: []
			}

			dispatch(addScene({ scene: scene }))
		})
	}

	return (
		<div>
			<button onClick={handleCreateScenes}>add</button>

			<PanoList
				items={items}
				selected={selected}
				onClick={handleSelect}
			/>
		</div>
	)
}

export default PanoView
