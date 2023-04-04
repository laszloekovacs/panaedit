const storeDefaultState: State = {
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
		basePath: '/panorama'
	},
	scenes: {},
	articles: [],
	editor: {
		activeScene: ''
	}
}

export default storeDefaultState
