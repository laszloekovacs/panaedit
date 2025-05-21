const fileOptions = {
	types: [
		{
			description: 'json document',
			accept: { 'application/json': ['.json'] }
		}
	]
}

// Helper function to clean up hotspots before saving
const prepareHotspotsForSave = (scenes: { [key: string]: Scene }) => {
	const processedScenes = { ...scenes };
	
	// Process each scene's hotspots
	for (const sceneKey in processedScenes) {
		const scene = processedScenes[sceneKey];
		
		if (scene.hotSpots && scene.hotSpots.length > 0) {
			scene.hotSpots = scene.hotSpots.map(hotspot => {
				// Make a copy to avoid mutating the original
				const processedHotspot = { ...hotspot };
				
				// For photo hotspots, ensure we're using the path key, not the blob URL
				if (processedHotspot.type === 'photo' && processedHotspot.URL) {
					// URL should already be the path key, not the blob URL
					// But we'll check if it begins with 'blob:' and log a warning
					if (processedHotspot.URL.startsWith('blob:')) {
						console.warn('Found blob URL in photo hotspot - this might cause issues when reloading');
					}
				}
				
				return processedHotspot;
			});
		}
	}
	
	return processedScenes;
};

export async function saveProjectFile(data: State, window: Window) {
	try {
		const filehandle = await window.showSaveFilePicker(fileOptions)
		const writable = await filehandle.createWritable()

		// Create a clean copy of the state without the cache
		const cleanData = {
			...data,
			scenes: prepareHotspotsForSave(data.scenes),
			cache: [] // Save with empty cache to avoid blob URL reference issues
		}

		// Convert to JSON with pretty formatting
		const text = JSON.stringify(cleanData, null, 2)

		await writable.write(text)
		await writable.close()
		
		console.log("Project saved successfully (without cache)")
	} catch (error) {
		console.log("Error saving project:", error)
	}
}