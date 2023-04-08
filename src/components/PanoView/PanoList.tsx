import React from 'react'
import PanoListItem from './PanoListItem'

interface PropType {
	items: { key: string; value: string }[]
	selected: string[]
	onClick: (item: string) => void
}

const PanoList = ({ items, selected, onClick }: PropType) => {
	return (
		<ul className="flex flex-row flex-wrap">
			{items.map((item, index) => (
				<PanoListItem
					key={index}
					item={item}
					onClick={onClick}
					selected={selected.includes(item.key)}
				/>
			))}
		</ul>
	)
}

export default PanoList
