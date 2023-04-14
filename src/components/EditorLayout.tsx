import React from 'react'
import { useEditor } from '../hooks/useEditor'
import HotspotContainer from './HotspotContainer'
import PreviewContainer from './PreviewContainer'
import SceneList from './SceneList'
import SceneSettings from './SceneSettings'

const EditorLayout = () => {
	const { scenes } = useEditor()

	if (Object.keys(scenes).length === 0) {
		return (
			<div>
				<p>No panoramas added to the current project</p>
			</div>
		)
	}

	return (
		<div className="flex h-full flex-row flex-nowrap overflow-hidden">
			<div
				id="sidebar"
				className="mr-4 flex w-[22rem] flex-none flex-col"
			>
				<h2>Scene List</h2>
				<SceneList />
				<SceneSettings />
				<HotspotContainer />
			</div>
			<PreviewContainer />
		</div>
	)
}

export default EditorLayout
