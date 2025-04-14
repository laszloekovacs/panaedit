import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addHotspot, triggerRefresh } from '../store'
import { useEditor } from '../hooks/useEditor'
import Dialog from './Dialog'
import { filterCache } from '../functions'

const HotspotAddPhotoWithTooltip = () => {
	const dispatch = useDispatch()
	const { activeSceneKey, editor, cache } = useEditor()
	const [showDialog, setShowDialog] = useState(false)

	// Filter photos from the cache
	const photos = filterCache(cache, /photos/)

	const handleOpenDialog = () => {
		setShowDialog(true)
	}

	const handleClose = () => {
		setShowDialog(false)
	}

	const handleSelectPhoto = (photoKey) => {
		// Find the selected photo from the cache
		const selectedPhoto = cache.find(item => item.key === photoKey)
		
		if (!selectedPhoto) return

		// Clean filename for display
		const filename = photoKey.split('/').pop() || 'Photo'

		const hotspot: Hotspot = {
			type: 'photo',
			yaw: editor.yaw,
			pitch: editor.pitch,
			text: 'Photo: ' + filename,
			targetYaw: 'sameAzimuth',
			// Store the photo URL for tooltip rendering
			URL: selectedPhoto.value,
			// Custom tooltip function that displays an image on hover
			createTooltipFuncStr: `function(hotSpotDiv, args) {
				var wrapper = document.createElement("div");
				wrapper.classList.add("hotspot-tooltip");
				
				var img = document.createElement("img");
				img.src = args.URL;
				img.alt = args.text;
				img.style.maxWidth = "200px";
				img.style.maxHeight = "150px";
				wrapper.appendChild(img);
				
				if (args.text) {
					var caption = document.createElement("div");
					caption.classList.add("tooltip-caption");
					caption.innerText = args.text;
					caption.style.textAlign = "center";
					caption.style.background = "rgba(0,0,0,0.6)";
					caption.style.color = "white";
					caption.style.padding = "4px";
					wrapper.appendChild(caption);
				}
				
				hotSpotDiv.appendChild(wrapper);
				return wrapper;
			}`,
			createTooltipArgs: { 
				URL: selectedPhoto.value,
				text: filename
			}
		}

		dispatch(addHotspot({ sceneKey: activeSceneKey, hotspot }))
		dispatch(triggerRefresh())
		setShowDialog(false)
	}

	return (
		<div className="flex flex-row">
			<button onClick={handleOpenDialog}>add photo tooltip</button>
			
			<Dialog isOpen={showDialog} onClose={handleClose}>
				<div className="p-4">
					<h2>Select Photo for Tooltip</h2>
					<div className="grid grid-cols-2 gap-2 mt-4 max-h-96 overflow-y-auto">
						{photos.map((photo) => (
							<div 
								key={photo.key} 
								className="cursor-pointer border hover:border-purple-500"
								onClick={() => handleSelectPhoto(photo.key)}
							>
								<img 
									src={photo.value} 
									alt={photo.key.split('/').pop()} 
									className="w-full h-32 object-cover"
								/>
								<p className="text-sm p-1 truncate bg-black bg-opacity-30 text-white">
									{photo.key.split('/').pop()}
								</p>
							</div>
						))}
					</div>
				</div>
			</Dialog>
		</div>
	)
}

export default HotspotAddPhotoWithTooltip