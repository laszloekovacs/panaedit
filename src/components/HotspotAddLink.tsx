import React from 'react'
import Dialog from './Dialog'
import { useDispatch } from 'react-redux'
import SceneList from './SceneList'

import { addHotspot } from '../store'
import { useEditor } from '../hooks'

const HotspotAddLink = () => {
	const [showDialog, setShowDialog] = React.useState(false)
	const dispatch = useDispatch()
	const { scenes, editor, activeSceneKey } = useEditor()
	const sceneList = Object.values(scenes)
	const { yaw, pitch } = editor

	const showLinkDialog = () => {
		setShowDialog(true)
	}

	const handleClose = () => {
		setShowDialog(false)
	}

	const handleSelection = (target: string) => {
		console.log('selected scene', target)
		/* set sceneId of the newly created hotspot */
		const hotspot: Hotspot = {
			sceneId: target,
			yaw,
			pitch,
			targetYaw: 'sameAzimuth',
			text: 'new scene',
			type: 'scene'
		}

		/* add hotspot to the current scene */
		dispatch(addHotspot({ sceneKey: activeSceneKey, hotspot }))
	}

	return (
		<div>
			<button onClick={showLinkDialog}>add link</button>
			<Dialog isOpen={showDialog} onClose={handleClose}>
				<div>Link Dialog</div>
				<SceneList items={sceneList} onClick={handleSelection} />
			</Dialog>
		</div>
	)
}

export default HotspotAddLink
