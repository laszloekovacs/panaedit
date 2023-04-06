import React, { useContext, useEffect } from 'react'
import PanoList from './PanoList'
import { FoldersContext } from '../FoldersProvider/FoldersProvider'
import { filteredMapToObjArray } from './filteredMapToObjArray'

/* show all panoramas in the panorama folder, click to add
 */

const PanoView = () => {
	const filemap = useContext<Map<string, string>>(FoldersContext)

	const handleSelect = (item) => {
		console.log(item)
	}

	const filteredmap = filteredMapToObjArray(filemap, /^panorama/)

	return (
		<div>
			<PanoList items={filteredmap} onClick={handleSelect} />
		</div>
	)
}

export default PanoView
