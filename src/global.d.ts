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
	scenes: Scene[string] | {}
	articles: []
	editor: {
		currentScene: string
	}
}

declare interface Scene {
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

declare
interface AddSceneAction extends Action {
	payload: {
		scene: Scene
	}
}

declare interface RemoveSceneAction extends Action {
	payload: {
		sceneKey: string
	}
}

declare interface LoadProjectAction extends Action {
	payload: {
		project: State
	}
}

declare interface AddHotspotAction extends Action {
	payload: {
		sceneKey: string
		hotspot: Hotspot
	}
}

declare interface RemoveHotspotAction extends Action {
	payload: {
		sceneKey: string
		hotspotIndex: number
	}
}
