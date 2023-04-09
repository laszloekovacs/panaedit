import React from 'react'
import Dialog from '../Dialog/Dialog'
import { useDispatch, useSelector } from 'react-redux'
import SceneList from '../SceneListContainer/SceneList'
import { scenesToArray } from '../SceneListContainer/scenesToArray'
import { addHotspot } from '../../store'

const HotspotAddLink = () => {
	const sceneList = scenesToArray(useSelector((state: State) => state.scenes))
	const [showDialog, setShowDialog] = React.useState(false)
	const { yaw, pitch } = useSelector((state: State) => state.editor)
	const dispatch = useDispatch()
	const sceneKey = useSelector((state: State) => state.editor.activeScene)

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
		dispatch(addHotspot({ sceneKey, hotspot }))
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
