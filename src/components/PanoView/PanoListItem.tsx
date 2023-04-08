import React from 'react'

interface PropType {
	item: { key: string; value: string }
	selected: boolean
	onClick: (item: string) => void
}

const PanoListItem = ({ item, selected, onClick }: PropType) => {
	/* trim path so it look better */
	const filename = item.key.split('/').pop() || item.key

	const selection = selected ? 'bg-pink-400' : 'bg-purple-400'

	return (
		<li
			className="border-2 border-solid border-neutral-700 border-opacity-50"
			onClick={() => onClick(item.key)}
		>
			<div className={selection ?? ''}>
				<p>{filename}</p>
				<img src={item.value} alt={item.key} />
			</div>
		</li>
	)
}

export default PanoListItem
