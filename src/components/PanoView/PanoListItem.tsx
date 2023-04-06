import React from 'react'

const PanoListItem = ({ item, onClick }) => {
	/* trim path so it look better */
	const filename = item.key.split('/').pop()

	return (
		<li
			className="border-2 border-solid border-neutral-700 border-opacity-50"
			onClick={() => onClick(item)}
		>
			<p>{filename}</p>
			<img src={item.value} alt={item} />
		</li>
	)
}

export default PanoListItem
