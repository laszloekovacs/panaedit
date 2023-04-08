import React, { useContext, useEffect } from 'react'
import PanoList from './PanoList'
import { FoldersContext } from '../FoldersProvider/FoldersProvider'
import { filteredMapToObjArray } from './filteredMapToObjArray'

/* show all panoramas in the panorama folder, click to add
todo: add loading indicator, it seems its needed
*/

const PanoView = () => {
	const filemap = useContext<Map<string, string>>(FoldersContext)

	const handleSelect = (item) => {
		console.log(item)
	}

	const items = filteredMapToObjArray(filemap, /^panorama/)

	return (
		<div>
			<PanoList items={items} onClick={handleSelect} />
		</div>
	)
}

export default PanoView
