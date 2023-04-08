import React from 'react'

const PanoListItem = ({ item, selected, onClick }) => {
	/* trim path so it look better */
	const filename = item.key.split('/').pop()

	const selection = selected ? 'bg-pink-400' : ''

	return (
		<li
			className="border-2 border-solid border-neutral-700 border-opacity-50"
			onClick={() => onClick(item)}
		>
			<div className={selection ?? ''}>
				<p>{filename}</p>
				<img src={item.value} alt={item} />
			</div>
		</li>
	)
}

export default PanoListItem
