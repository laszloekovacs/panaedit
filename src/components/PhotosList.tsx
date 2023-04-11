import React from 'react'
import { filterCache } from '../functions/filterCache'
import { useEditor } from '../hooks/useEditor'
import PhotosListItem from './PhotosListItem'

const PhotosList = () => {
	const { cache } = useEditor()

	const photos = filterCache(cache, /^photo/)

	return (
		<ul className="grid grid-cols-2 gap-1 h-full overflow-y-auto md:grid-cols-3 lg:grid-cols-4">
			{photos &&
				photos.map((photo) => (
					<PhotosListItem key={photo.key} photo={photo} />
				))}
		</ul>
	)
}

export default PhotosList
