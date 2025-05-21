	import React from 'react'
	import { useDispatch } from 'react-redux'
	import { addHotspot, triggerRefresh } from '../store'
	import { useEditor } from '../hooks/useEditor'

	const HotspotAddPhoto = () => {
		const dispatch = useDispatch()
		const { activeSceneKey, editor } = useEditor()

		const handleAddPhoto = (e) => {
			const hotspot: Hotspot = {
				type: 'info',
				yaw: editor.yaw,
				pitch: editor.pitch,
				text: 'new photo',
				targetYaw: 'sameAzimuth',
				// Pass the function name as a string to be evaluated later
				clickHandlerFuncStr: 'function(e, args) { alert(args.message); }',
				clickHandlerArgs: { message: 'abcd' }
			}

			dispatch(addHotspot({ sceneKey: activeSceneKey, hotspot }))
			dispatch(triggerRefresh())
		}

		return (
			<div className="flex flex-row">
				<button onClick={handleAddPhoto}>add photo</button>
			</div>
		)
	}

	export default HotspotAddPhoto
