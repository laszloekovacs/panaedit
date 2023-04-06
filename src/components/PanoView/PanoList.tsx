import React from 'react'
import PanoListItem from './PanoListItem'

const PanoList = ({ items, onClick }) => {
	return (
		<ul className="flex flex-row flex-wrap">
			{items.map((item, index) => (
				<PanoListItem key={index} item={item} onClick={onClick} />
			))}
		</ul>
	)
}

export default PanoList
