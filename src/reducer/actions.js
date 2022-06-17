
export function loadFileAction(data) {
    return { type: "LOAD_FILE", payload: data }
}

export function addArticleAction(title) {
    return { type: "ADD_ARTICLE", payload: title }
}

export function removeArticleAction(index) {
    return { type: "REMOVE_ARTICLE", payload: index }
}

export function resetAction() {
    return { type: "RESET", payload: "" }
}

export function addSceneAciton(image) {
    return { type: "ADD_SCENE", payload: image }
}

export function setFirstSceneAction(scene) {
    return { type: "SET_FIRST_SCENE", payload: scene }
}

export function addHotspotAction(hotspot) {
    return { type: "ADD_HOTSPOT", payload: hotspot }
}

export function removeHotspotAction(index, parent) {
    return { type: "REMOVE_HOTSPOT", payload: { index, parent } }
}

export function updateArticleAction(oldTitle, newTitle, text) {
    return { type: "UPDATE_ARTICLE", payload: { oldTitle, newTitle, text } }
}

export function deleteImageAction(article, index) {
    return { type: "DELETE_IMAGE", payload: { article, index } }
}

export function addImagesAction(article, images) {
    return { type: "PASTE_IMAGES", payload: { article, images } }
}

export function setInitialRotationAction(scene, yaw, pitch) {
    return { type: "SET_INITIAL", payload: { scene, yaw, pitch } }
}

export function sceneChangeAction(scene) {
    return { type: "SET_EDITOR_SCENE", payload: { editor: { currentScene: scene } } }
}

export function setTitleAction(scene, title) {
    return { type: "SET_SCENE_TITLE", payload: { scene, title } }
}