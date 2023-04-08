import React, { useContext, useEffect } from 'react'
import PanoList from './PanoList'
import { FoldersContext } from '../FoldersProvider/FoldersProvider'
import { filteredMapToObjArray } from './filteredMapToObjArray'

/* show all panoramas in the panorama folder, click to add
todo: add loading indicator, it seems its needed
*/

const PanoView = () => {
	const filemap = useContext<Map<string, string>>(FoldersContext)

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

	return (
		<div>
			<PanoList
				items={items}
				selected={selected}
				onClick={handleSelect}
			/>
		</div>
	)
}

export default PanoView
