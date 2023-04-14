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
		triggerRefresh: 0
	},
	cache: []
}

// TODO: do we need panoramas as base path?
export default storeDefaults
