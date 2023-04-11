import React from 'react'
import { useEditor } from '../hooks/useEditor'
import Hotspot from './Hotspot'
import PreviewContainer from './PreviewContainer'
import SceneList from './SceneList'
import SceneSettings from './SceneSettings'

const EditorLayout = () => {
	const { scenes } = useEditor()

	if (Object.keys(scenes).length === 0) {
		return (
			<div>
				<p>no panoramas added to the current project</p>
			</div>
		)
	}

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
