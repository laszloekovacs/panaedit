import React from 'react'
import PanoListItem from './PanoListItem'

const PanoList = ({ items }) => {
	return (
		<ul>
			{items.map((item, index) => {
				return <PanoListItem key={index} item={item} />
			})}
		</ul>
	)
}

export default PanoList
