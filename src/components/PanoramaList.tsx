import React from 'react'
import PanoramaListItem from './PanoramaListItem'

import { useEditor } from '../hooks'
import { filterCache } from '../functions/filterCache'

const PanoramaGrid = () => {
	const { cache } = useEditor()

	const list = filterCache(cache, /^panoramas/)

	return (
		<ul className="grid gap-1 md:grid-cols-3 grid-cols-2 my-8">
			{list.map((item, index) => (
				<PanoramaListItem key={index} item={item} />
			))}
		</ul>
	)
}

export default PanoramaGrid
