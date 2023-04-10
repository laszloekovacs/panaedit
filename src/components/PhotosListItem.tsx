import React from 'react'

type Props = {
	photo: CacheLine
}

const PhotosListItem = ({ photo }: Props) => {
	const { key, value } = photo

	return (
		<li className="object-contain">
			<img src={value} alt={key} />
		</li>
	)
}

export default PhotosListItem
