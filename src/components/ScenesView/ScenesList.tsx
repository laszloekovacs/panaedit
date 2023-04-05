import React from 'react'
import ScenesListItem from './ScenesListItem'

const ScenesList = ({ items }) => {
	return (
		<ul>
			{items.map((item, index) => {
				return <ScenesListItem key={index} item={item} />
			})}
		</ul>
	)
}

export default ScenesList
