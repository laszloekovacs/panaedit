import React from 'react'

type Props = {
	photo: CacheLine
}

const PhotosListItem = ({ photo }: Props) => {
	const { key, value } = photo

	// get filename from path
	const filename = key.split('/').pop()

	return (
		<li className="relative aspect-video bg-neutral-900 bg-opacity-10 p-1">
			<p className="z-20 absolute bg-stone-600 bg-opacity-50">
				{filename}
			</p>
			<div className="static">
				<img
					src={value}
					alt={key}
					className="z-10 aspect-video object-contain h-full w-full"
				/>
			</div>
		</li>
	)
}

export default PhotosListItem
