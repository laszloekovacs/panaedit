
const initialStore = {

}

export function createLoadSceneAction(scene) {
    return {
        type: "LOAD_SCENE",
        payload: scene
    }
}

function loadSceneAction(store, payload) {
    return { ...store, ...payload }
}

export function createUpdateSceneAction(updates) {
    return {
        type: "UPDATE_SCENE",
        payload: updates
    }
}

function updateSceneAction(store, payload) {
    return { ...store, ...payload }
}



export default function reducer(store = initialStore, action) {

    switch (action.type) {
        case "LOAD_SCENE":
            return loadSceneAction(store, action.payload)

        case "UPDATE_SCENE":
            return updateSceneAction(store, action.payload)

        default:
            return store;
    }

    return store;
}