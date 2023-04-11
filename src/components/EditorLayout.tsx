import React from 'react'
import PreviewContainer from './PreviewContainer'
import Hotspot from './Hotspot'
import SceneSettings from './SceneSettings'
import SceneList from './SceneList'
import { useEditor } from '../hooks/useEditor'

const EditorLayout = () => {
	const { scenes } = useEditor()

	if (Object.keys(scenes).length === 0) return null

	return (
		<div className="flex flex-row flex-nowrap h-full overflow-hidden">
			<div id="sidebar" className="flex flex-col w-80 mr-4 flex-none">
				<h2>Scene List</h2>
				<SceneList />
				<SceneSettings />
				<Hotspot />
			</div>
			<PreviewContainer />
		</div>
	)
}

export default EditorLayout
