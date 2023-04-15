import React from 'react'
import { createPortal } from 'react-dom'
import Dialog from './Dialog'
import { useDispatch } from 'react-redux'

import { addHotspot, triggerRefresh } from '../store'
import { useEditor } from '../hooks/useEditor'
import LinkSceneList from './LinkSceneList'

const HotspotAddLink = () => {
	const [showDialog, setShowDialog] = React.useState(false)
	const dispatch = useDispatch()
	const { editor, activeSceneKey } = useEditor()

	const showLinkDialog = () => {
		setShowDialog(true)
	}

	const handleClose = () => {
		setShowDialog(false)
	}

	const handleLinkScene = (sceneKey) => {
		const hotspot = {
			yaw: editor.yaw,
			pitch: editor.pitch,
			type: 'scene',
			text: 'Link to ' + sceneKey,
			sceneId: sceneKey
		} as Hotspot

		dispatch(addHotspot({ sceneKey: activeSceneKey, hotspot }))
		dispatch(triggerRefresh())
		setShowDialog(false)
	}

	return (
		<div>
			<button onClick={showLinkDialog}>add link</button>
			<Dialog isOpen={showDialog} onClose={handleClose}>
				<div>
					<h2>Select target scene</h2>
					<LinkSceneList onClick={handleLinkScene} />
				</div>
			</Dialog>
		</div>
	)
}

export default HotspotAddLink
