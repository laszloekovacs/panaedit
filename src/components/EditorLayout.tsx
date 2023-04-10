import React from 'react'
import Pannellum from './PreviewContainer'
import Hotspot from './Hotspot'
import SceneSettings from './SceneSettings'
import SceneList from './SceneList'

const EditorLayout = () => {
	return (
		<div className="grid grid-cols-2">
			<div id="sidebar" className="h-full">
				<h2>Scene List</h2>
				<SceneList />
				<SceneSettings />
				<Hotspot />
			</div>
			<Pannellum />
		</div>
	)
}

export default EditorLayout
