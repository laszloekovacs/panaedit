const storeDefaults: State = {
	default: {
		firstScene: '',
		sceneFadeDuration: 1000,
		type: 'equirectangular',
		autoLoad: true,
		compass: true,
		hotSpotDebug: true,
		hfov: 110,
		vfov: 100,
		minPitch: -98,
		maxPitch: 98,
		basePath: '/panoramas'
	},
	scenes: {},
	articles: [],
	editor: {
		activeScene: '',
		yaw: 0,
		pitch: 0
	},
	cache: {
		pathmap: new Map<string, string>()
	}
}

// TODO: do we need panoramas as base path
export default storeDefaults
