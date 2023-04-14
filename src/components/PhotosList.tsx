import React from 'react'
import { filterCache } from '../functions'
import { useEditor } from '../hooks/useEditor'
import { useAsyncCall } from '../hooks/useAsyncCall'
import PhotosListItem from './PhotosListItem'

const PhotosList = () => {
	const { cache } = useEditor()

	const [photos, loading] = useAsyncCall(() => {
		return filterCache(cache, /photos/)
	})

	if (loading) return <div>loading...</div>

	if (!photos)
		return (
			<div>
				<p>no photos found</p>
			</div>
		)

	return (
		<ul className="grid h-full grid-cols-2 gap-1 overflow-y-auto md:grid-cols-3 lg:grid-cols-4">
			{photos &&
				photos.map((photo) => (
					<PhotosListItem key={photo.key} photo={photo} />
				))}
		</ul>
	)
}

export default PhotosList
