/* set the active scene for the editor. */
export function _setActiveScene(
	state: State,
	action: {
		payload: {
			sceneKey: string
		}
	}
) {
	const { sceneKey } = action.payload

	if (!state.scenes[sceneKey]) {
		throw new Error(`scene does not exist: ${sceneKey}`)
	}

	state.editor.activeSceneKey = sceneKey

	return state
}

export function _SetEditorOrientation(
	state: State,
	action: {
		payload: {
			yaw: number
			pitch: number
		}
	}
) {
	const { yaw, pitch } = action.payload

	state.editor.yaw = yaw
	state.editor.pitch = pitch

	return state
}

export function _SetActiveView(
	state: State,
	action: {
		payload: {
			view: string
		}
	}
) {
	const { view } = action.payload

	state.editor.activeView = view

	return state
}

export function _TriggerRefresh(state: State) {
	state.editor.triggerRefresh = state.editor.triggerRefresh + 1

	return state
}
