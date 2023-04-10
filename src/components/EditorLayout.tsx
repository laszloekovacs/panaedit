import React from 'react'
import Pannellum from './PreviewContainer'
import Hotspot from './Hotspot'
import SceneSettings from './SceneSettings'
import SceneList from './SceneList'

const EditorLayout = () => {
	return (
		<div className="flex min-h-max flex-row">
			<div className="h-full w-80 mr-2">
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
