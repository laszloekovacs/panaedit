import React from 'react'
import SceneListContainer from '../SceneListContainer/SceneListContainer'
import Hotspot from '../Hotspot/Hotspot'

const Sidebar = () => {
	return (
		<div className="max-h-full w-80 bg-neutral-500">
			<h1>Sidebar</h1>
			<SceneListContainer />
			<Hotspot />
		</div>
	)
}

export default Sidebar
