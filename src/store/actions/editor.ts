/* set the active scene for the editor. */
export function _setActiveScene(state: State, action: SetActiveSceneAction) {
	const { sceneKey } = action.payload

	if (!state.scenes[sceneKey]) {
		throw new Error('scene does not exist')
	}

	state.editor.activeScene = sceneKey

	return state
}
