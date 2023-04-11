import React from 'react'

type Props = {
	photo: CacheLine
}

const PhotosListItem = ({ photo }: Props) => {
	const { key, value } = photo

	return (
		<li className="aspect-video bg-neutral-900 bg-opacity-10 p-2">
			<img src={value} alt={key} className="object-contain h-full w-full" />
		</li>
	)
}

export default PhotosListItem
