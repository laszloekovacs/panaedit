const storeDefaults: State = {
	default: {
		firstScene: '',
		sceneFadeDuration: 1000,
		type: 'equirectangular',
		autoLoad: true,
		compass: true,
		hotSpotDebug: true,
		hfov: 80,
		vfov: 80,
		minPitch: -98,
		maxPitch: 98,
		basePath: '/panoramas',
		friction: 1.0
	},
	scenes: {},
	articles: [],
	editor: {
		activeSceneKey: '',
		activeView: 'panoramas',
		yaw: 0,
		pitch: 0,
		triggerRefresh: 0,
		previewReady: false
	},
	cache: [],
	// Add the floor plan state
	floorPlan: {
		imagePath: '',
		markers: []
	}
}

export default storeDefaults