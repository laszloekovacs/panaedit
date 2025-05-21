import React, { useState } from 'react'
import { useEditor } from '../hooks/useEditor'
import HotspotContainer from './HotspotContainer'
import PreviewContainer from './PreviewContainer'
import SceneList from './SceneList'
import SceneSettings from './SceneSettings'
import MiniMap from './MiniMap'

const EditorLayout = () => {
	const { scenes } = useEditor()
	const [showMiniMap, setShowMiniMap] = useState(true)

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
				className="mr-4 flex w-[26rem] flex-none flex-col">
				<h2>Scene List</h2>
				<SceneList />
				<SceneSettings />
				
				{/* Mini Map Toggle */}
				<div className="mb-4 flex justify-between items-center">
					<h2>Navigation Map</h2>
					<button 
						className="text-xs px-2"
						onClick={() => setShowMiniMap(!showMiniMap)}
					>
						{showMiniMap ? 'Hide' : 'Show'}
					</button>
				</div>
				
				{/* Conditionally render MiniMap */}
				{showMiniMap && <MiniMap />}
				
				<HotspotContainer />
			</div>
			<PreviewContainer />
		</div>
	)
}

export default EditorLayout