import React from 'react'
import { useDispatch } from 'react-redux'
import { addHotspot, triggerRefresh } from '../store'
import { useEditor } from '../hooks/useEditor'

const HotspotAddWebLink = () => {
	const dispatch = useDispatch()
	const { activeSceneKey, editor } = useEditor()

	const handleAddWebLink = (e) => {
		// Prompt user for URL
		const url = prompt('Enter URL to link to:', 'https://')
		
		// If user cancels or enters empty string, do nothing
		if (!url) return
		
		// Create a cleaned URL with protocol if missing
		let cleanUrl = url.trim()
		if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
			cleanUrl = 'https://' + cleanUrl
		}
		
		// Create a display name from the URL
		const displayUrl = cleanUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')
		
		const hotspot: Hotspot = {
			type: 'info',
			yaw: editor.yaw,
			pitch: editor.pitch,
			text: 'Web: ' + displayUrl,
			targetYaw: 'sameAzimuth',
			// Pass the function name as a string to be evaluated later
			clickHandlerFuncStr: 'function(e, args) { window.open(args.url, "_blank"); }',
			clickHandlerArgs: { url: cleanUrl }
		}

		dispatch(addHotspot({ sceneKey: activeSceneKey, hotspot }))
		dispatch(triggerRefresh())
	}

	return (
		<div className="flex flex-row">
			<button onClick={handleAddWebLink}>add web link</button>
		</div>
	)
}

export default HotspotAddWebLink