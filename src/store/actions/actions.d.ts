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
		sceneKey: string
		blob: string
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

declare interface SetEditorOrientationAction extends Action {
	payload: {
		yaw: number
		pitch: number
	}
}

declare interface UpdateHotspotAction extends Action {
	payload: {
		sceneKey: string
		hotspotIndex: number
		hotspot: Hotspot
	}
}

declare interface AddToCacheAction extends Action {
	payload: {
		path: string
		blobUrl: string
	}
}

declare interface ReplaceCacheAction extends Action {
	payload: {
		map: CacheLine[]
	}
}

declare interface SetActiveViewAction extends Action {
	payload: {
		view: string
	}
}
