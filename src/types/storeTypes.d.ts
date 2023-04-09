export {}

/* extend window type */
declare global {
	interface Window {
		pannellum: Pannellum
	}
	interface Pannellum {
		viewer: (container: string, config: State) => PannellumViewer
	}

	type viewerEvent = 'error' | 'load' | 'scenechange' | 'animatefinished'

	interface PannellumViewer {
		on: (event: viewerEvent, listener: (data: unknown) => void) => void
		destroy: () => void
		getYaw: () => number
		getPitch: () => number
	}

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
		}
		scenes: Scene[string]
		articles: Article[]
		editor: {
			activeScene: string
			yaw: number
			pitch: number
		}
		cache: {
			pathmap: Map<string, string>
		}
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
		id: number
		title: string
		url: string
		photos: Photo[]
	}

	declare interface Photo {
		url: string
		label: string
	}
}
