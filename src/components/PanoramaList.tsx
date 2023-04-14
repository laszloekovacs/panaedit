import React from 'react'
import PanoramaListItem from './PanoramaListItem'

import { useEditor } from '../hooks/useEditor'
import { filterCache } from '../functions/filterCache'

const PanoramaGrid = () => {
	const { cache } = useEditor()

	const list = filterCache(cache, /panoramas/)
	console.log(list)
	return (
		<ul className="my-8 grid grid-cols-2 gap-1 md:grid-cols-3">
			{list.map((item, index) => (
				<PanoramaListItem key={index} item={item} />
			))}
		</ul>
	)
}

export default PanoramaGrid
