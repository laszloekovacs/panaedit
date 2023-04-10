import React from 'react'
import SceneListItem from './SceneListItem'

const SceneList = ({ items }: { items: string[] }) => {
	return <ul>{items && items.map((item) => <SceneListItem key={item} itemKey={item} />)}</ul>
}

export default SceneList
