export {}
declare global {
	declare interface State {
		default: Default
		scenes: { [key: string]: Scene }
		articles: Article[]
		editor: Editor
		cache: CacheLine[]
	}

	declare interface Default {
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
	}

	declare interface Editor {
		activeView: string
		activeSceneKey: string
		yaw: number
		pitch: number
		triggerRefresh: number
	}

	declare interface CacheLine {
		key: string
		value: string
	}

	declare interface Scene {
		title: string
		northOffset: number
		panorama: string
		hotSpots: Hotspot[]
	}

	declare interface Hotspot {
		pitch: number
		yaw: number
		type: 'scene' | 'info'
		text: string
		targetYaw: 'sameAzimuth'
		sceneId?: string
	}

	declare interface Article {
		title: string
		url: string
		photos: Photo[]
	}

	declare interface Photo {
		url: string
		label: string
	}
}
