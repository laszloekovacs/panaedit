
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