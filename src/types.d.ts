/* type of the store defaults */

declare interface ProjectState {
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
	scenes: {}[string]
	articles: {}[]
	editor: {
		currentScene: string
	}
}

declare const resetReducer: (state: ProjectState) => ProjectState
