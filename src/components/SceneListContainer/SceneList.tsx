import React from 'react'
import SceneListItem from './SceneListItem'

const SceneList = ({ items, onClick }) => {
	return (
		<ul>
			{items.map((item, i) => (
				<SceneListItem key={i} item={item} onClick={onClick} />
			))}
		</ul>
	)
}

export default SceneList
