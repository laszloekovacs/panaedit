/* set the active scene for the editor. */
export function _setActiveScene(state: State, action: SetActiveSceneAction) {
	const { sceneKey } = action.payload

	if (!state.scenes[sceneKey]) {
		throw new Error(`scene does not exist: ${sceneKey}`)
	}

	state.editor.activeScene = sceneKey

	return state
}

export function _SetEditorOrientation(
	state: State,
	action: SetEditorOrientationAction
) {
	const { yaw, pitch } = action.payload

	state.editor.yaw = yaw
	state.editor.pitch = pitch

	return state
}

export function _SetActiveView(state: State, action: SetActiveViewAction) {
	const { view } = action.payload

	state.editor.activeView = view

	return state
}
