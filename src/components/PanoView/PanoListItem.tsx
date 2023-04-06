import React from 'react'

const PanoListItem = ({ item, onClick }) => {
	return (
		<li onClick={() => onClick(item)}>
			<img src={item} alt={item} />
		</li>
	)
}

export default PanoListItem
