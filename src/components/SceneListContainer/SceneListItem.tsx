import React from 'react'

const SceneListItem = ({ item, onClick }) => {
	return (
		<li
			className="border-2 border-gray-300 "
			onClick={() => onClick(item.key)}
		>
			<p>{item.scene.title}</p>
			<p>{item.key}</p>
		</li>
	)
}

export default SceneListItem
