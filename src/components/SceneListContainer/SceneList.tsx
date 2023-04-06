import React from 'react'
import SceneListItem from './SceneListItem'

const SceneList = ({ items, onClick }) => {
	return (
		<div>
			<ul>
				{items.map((item) => (
					<SceneListItem
						key={item.key}
						item={item}
						onClick={onClick}
					/>
				))}
			</ul>
		</div>
	)
}

export default SceneList
