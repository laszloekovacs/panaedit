import React from 'react'

const PanoListItem = ({ item }) => {
	return (
		<li>
			<img src={item} alt={item} />
		</li>
	)
}

export default PanoListItem
