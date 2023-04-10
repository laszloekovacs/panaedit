import React from 'react'
import { useEditor } from '../hooks/useEditor'
import { filterCache } from '../functions/filterCache'
import PhotosListItem from './PhotosListItem'

const PhotosList = () => {
	const { cache } = useEditor()

	const photos = filterCache(cache, /^photo/)

	return (
		<ul className="grid grid-cols-3 gap-1 max-h-full overflow-y-auto">
			{photos && photos.map((photo) => <PhotosListItem key={photo.key} photo={photo} />)}
		</ul>
	)
}

export default PhotosList
