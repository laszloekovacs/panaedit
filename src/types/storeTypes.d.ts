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

declare interface AddPhotoAction extends Action {
	payload: {
		articleId: number
		photoUrl: string
	}
}

declare interface RemovePhotoAction extends Action {
	payload: {
		articleId: number
		url: string
	}
}

declare interface SetPhotoLabelAction extends Action {
	payload: {
		articleId: number
		url: string
		label: string
	}
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

declare interface SetFirstSceneAction extends Action {
	payload: {
		sceneKey: string
	}
}

declare interface SetSceneTitleAction extends Action {
	payload: {
		sceneKey: string
		title: string
	}
}

declare interface SetSceneNorthOffsetAction extends Action {
	payload: {
		sceneKey: string
		northOffset: number
	}
}

declare interface SetActiveSceneAction extends Action {
	payload: {
		sceneKey: string
	}
}

declare interface AddArticleAction extends Action {
	payload: {
		article: Article
	}
}

declare interface RemoveArticleAction extends Action {
	payload: {
		articleId: number
	}
}

declare interface SetEditorActiveSceneAction extends Action {
	payload: {
		sceneKey: string
	}
}
