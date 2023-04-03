const storeDefaultState = {
	default: {
		firstScene: '',
		sceneFadeDuration: 1000,
		type: 'equirectangular',
		autoLoad: true,
		compass: true,
		hotSpotDebug: true,
		hfov: 110,
		vfow: 100,
		minPitch: -98,
		maxPitch: 98,
		basePath: 'assets/panorama/',
		imagePath: 'assets/images/'
	},
	scenes: {},
	articles: [],
	editor: {
		currentScene: ''
	}
}

export default storeDefaults
