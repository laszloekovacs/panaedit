/* 
State. format is defined by pannellum
 */
declare interface State {
	default: {
		firstScene: string
		sceneFadeDuration: number
		type: 'equirectangular'
		autoLoad: boolean
		compass: boolean
		hotSpotDebug: boolean
		hfov: number
		vfov: number
		minPitch: number
		maxPitch: number
		basePath: string
		imagePath: string
	}
	scenes: Scene[string]
	articles: Article[]
	editor: {
		activeScene: string
	}
}

declare interface Scene {
	northOffset: number
	id: string
	name: string
	type: string
	panorama: string
	hotSpots: Hotspot[]
}

declare interface Hotspot {
	id: string
	type: string
	pitch: number
	yaw: number
	text: string
	sceneId: string
}

declare interface Article {
	id: number
	title: string
	url: string
	photos: Photo[]
}

declare interface Photo {
	url: string
	label: string
}
