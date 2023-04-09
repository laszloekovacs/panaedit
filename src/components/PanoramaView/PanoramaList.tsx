import React from 'react'
import PanoramaListItem from './PanoramaListItem'

import { useEditor } from '../../hooks'
import { filteredCache } from './filteredCache'

const PanoramaList = () => {
	const { cache } = useEditor()

	const list = filteredCache(cache, /^panoramas/)

	return (
		<ul className="flex flex-row flex-wrap">
			{list.map((item, index) => (
				<PanoramaListItem key={index} item={item} />
			))}
		</ul>
	)
}

export default PanoramaList
