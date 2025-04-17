import React, { useState } from 'react'
import Dialog from './Dialog'
import { useDispatch } from 'react-redux'

import { addHotspot, triggerRefresh } from '../store'
import { useEditor } from '../hooks/useEditor'
import LinkSceneList from './LinkSceneList'

const HotspotAddLink = () => {
	const [showDialog, setShowDialog] = useState(false)
	const [addBacklink, setAddBacklink] = useState(false)
	const dispatch = useDispatch()
	const { editor, activeSceneKey, scenes } = useEditor()

	const showLinkDialog = () => {
		setShowDialog(true)
	}

	const handleClose = () => {
		setShowDialog(false)
	}

	const toggleBacklink = () => {
		setAddBacklink(!addBacklink)
	}

	const handleLinkScene = (sceneKey) => {
		// Get the scene titles for both current and target scenes
		const targetSceneTitle = scenes[sceneKey]?.title || sceneKey
		const currentSceneTitle = scenes[activeSceneKey]?.title || activeSceneKey
		
		// Create a cleaner display title (use just the part after the last slash if it exists)
		const cleanTargetTitle = targetSceneTitle.split('/').pop() || targetSceneTitle
		const cleanCurrentTitle = currentSceneTitle.split('/').pop() || currentSceneTitle
		
		// 1. Create the forward link (from current scene to target scene)
		const forwardHotspot = {
			yaw: editor.yaw,
			pitch: editor.pitch,
			type: 'scene',
			text: cleanTargetTitle,
			sceneId: sceneKey
		} as Hotspot

		dispatch(addHotspot({ sceneKey: activeSceneKey, hotspot: forwardHotspot }))
		
		// 2. Create the backlink if enabled (from target scene back to current scene)
		if (addBacklink) {
			const backHotspot = {
				yaw: editor.yaw, // Using same orientation for now
				pitch: editor.pitch,
				type: 'scene',
				text: cleanCurrentTitle,
				sceneId: activeSceneKey
			} as Hotspot

			dispatch(addHotspot({ sceneKey: sceneKey, hotspot: backHotspot }))
		}
		
		// 3. Trigger refresh to update the view
		dispatch(triggerRefresh())
		setShowDialog(false)
	}

	return (
		<div>
			<button onClick={showLinkDialog}>add scene link</button>
			
			<Dialog isOpen={showDialog} onClose={handleClose} maxWidth="md">
				<div className="p-4 w-full" style={{ minWidth: '700px' }}>
					<div className="mb-4 flex items-center justify-between">
						<h3 className="text-lg font-bold">Create Scene Link</h3>
						
						<div className="flex items-center">
							<span className="mr-2 text-sm">Add backlink</span>
							<label className="relative inline-flex items-center cursor-pointer">
								<input 
									type="checkbox" 
									className="sr-only peer" 
									checked={addBacklink}
									onChange={toggleBacklink}
								/>
								<div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
							</label>
						</div>
					</div>
					
					{addBacklink && (
						<div className="mb-4 p-3 bg-blue-900 bg-opacity-20 border border-blue-700 rounded text-sm">
							<p>A backlink will be created in the target scene, pointing back to the current scene.</p>
						</div>
					)}
					
					<LinkSceneList onClick={handleLinkScene} />
					
					<div className="flex justify-end mt-4">
						<button onClick={handleClose} className="ml-auto">Close</button>
					</div>
				</div>
			</Dialog>
		</div>
	)
}

export default HotspotAddLink