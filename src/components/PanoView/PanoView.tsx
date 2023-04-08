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

	const handleSelect = (item) => {
		setSelected([...selected, item])

		console.log(selected)
	}

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
