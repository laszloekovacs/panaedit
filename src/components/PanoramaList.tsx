import React from 'react'
import PanoramaListItem from './PanoramaListItem'

import { useEditor } from '../hooks/useEditor'
import { filterCache } from '../functions/filterCache'

const PanoramaList = () => {
	const { cache, scenes } = useEditor()

	const list = filterCache(cache, /panoramas/)

	return (
		<ul className="mb-8 grid grid-cols-2 gap-1 md:grid-cols-3">
			{list.map((item, index) => (
				<PanoramaListItem key={index} item={item} scenes={scenes} />
			))}
		</ul>
	)
}

export default PanoramaList
