import React from 'react'
import { removeHotspot, triggerRefresh, updateHotspot } from '../store'
import EditableLabel from './EditableLabel'
import { useDispatch } from 'react-redux'
import pageicon from '../../public/img/page.svg'
import { useEditor } from '../hooks/useEditor'

type Props = {
	hotspot: Hotspot
	hotspotIndex: number
	sceneKey: string
}

const HotspotListItem = ({ hotspot, hotspotIndex, sceneKey }: Props) => {
	const dispatch = useDispatch()
	const { editor, scenes } = useEditor()
	const { text, pitch, yaw, type, sceneId } = hotspot

	/* remove hotspot */
	const handleRemove = (e) => {
		dispatch(removeHotspot({ sceneKey, hotspotIndex }))
		dispatch(triggerRefresh())
	}

	/* change text of the hotspot */
	const handleLabelChange = (text) => {
		const update = { ...hotspot, text: text }
		dispatch(updateHotspot({ sceneKey, hotspotIndex, hotspot: update }))
	}

	const handleReposition = () => {
		const { yaw, pitch } = editor

		dispatch(
			updateHotspot({
				sceneKey,
				hotspotIndex,
				hotspot: { ...hotspot, yaw, pitch }
			})
		)

		dispatch(triggerRefresh())
	}

	/* 
	when we hover over the hotspot, it should highlight it in the preview 
	most likely, i have to add some form of id to the hotspot to work	
	*/
	const handleHover = (text) => {
		/* find the element by its child inner text = hotspot.text */

		//return

		const hotspots = document.querySelectorAll('canvas + .pnlm-hotspot')
		if (!hotspots) return

		hotspots.forEach((hotspot) => {
			console.log(hotspot.querySelector('span')?.innerText)
			// if it has a span with the text = hotspot.text
			if (hotspot.querySelector('span')?.innerText == text) {
				// add border class to parent
				hotspot.classList.add('border-2 border-pink-500')
			}
		})
	}

	return (
		<li
			onMouseOver={() => handleHover(text)}
			className="group m-1 flex flex-row flex-nowrap justify-between bg-slate-900 bg-opacity-30 p-2 text-sm hover:bg-opacity-25"
		>
			<div>
				<EditableLabel value={text} onDoneEditing={handleLabelChange} />

				<div className="grid grid-cols-4 gap-x-1">
					<p className="opacity-70">Yaw:</p>
					<p>{yaw}</p>
					<p className="opacity-70">Pitch:</p>
					<p>{pitch}</p>
				</div>
				<div>
					{type == 'info' && (
						<p>
							<span className="opacity-70">Type:</span>
							<span>{type}</span>
						</p>
					)}
					{type == 'scene' && (
						<p>
							<span className="opacity-70">Target:</span>
							<span>{scenes[sceneId as string].title}</span>
						</p>
					)}
					{type == 'photo' && (
						<p>
							<span className="opacity-70">Type:</span>
							<span>{type}</span>
						</p>
					)}
				</div>
			</div>
			<div className="invisible flex flex-col group-hover:visible">
				<button onClick={handleRemove}>remove</button>
				<button onClick={handleReposition}>reposition</button>
			</div>
		</li>
	)
}

export default HotspotListItem
