import React from 'react'

const SceneListItem = ({ item, onClick }) => {
	return (
		<li onClick={() => onClick(item.key)}>
			<p>{item.scene.title}</p>
			<p>{item.key}</p>
		</li>
	)
}

export default SceneListItem
