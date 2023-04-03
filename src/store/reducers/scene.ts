/* restore the project to defaults */
export const resetReducer = (state) => storeDefaultState

/* load project from disc */
export const loadSceneReducer = (scene, action) => {
	return { project: action.payload }
}

/* add scene */
export const addSceneReducer = (scene, action) => {
	return scene
}

/* remove scene */
export const removeSceneReducer = (scene, action) => {
	return scene
}
