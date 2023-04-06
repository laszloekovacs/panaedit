import React, { useContext, useEffect } from 'react'
import PanoList from './PanoList'
import { FoldersContext } from '../FoldersProvider/FoldersProvider'
import { filterMapByKeyRegex } from './FilterMapByKeyRegex'

/* show all panoramas in the panorama folder, click to add
 */

const PanoView = () => {
	const filemap = useContext<Map<string, string>>(FoldersContext)
	const filteredmap = filterMapByKeyRegex(`/^panorama/`, filemap)

	const handleSelect = (item) => {
		console.log(item)
	}

	/* remove non panoramas, and turn it into an obj array */
	const items = filteredMapToArray(filteredmap)

	return (
		<div>
			<PanoList items={filteredmap} onClick={handleSelect} />
		</div>
	)
}

export default PanoView
