import { legacy_createStore } from "redux"
import { devToolsEnhancer } from "redux-devtools-extension"
import { reducer } from "./reducer"
import { Store } from "./types"


export const storeDefaults: Store = {
    default: {
        firstScene: "",
        sceneFadeDuration: 1000,
        type: "equirectangular",
        autoLoad: true,
        compass: true,
        hotSpotDebug: true,
        hfov: 110,
        vfow: 100,
        minPitch: -98,
        maxPitch: 98,
        basePath: "assets/panorama/",
        imagePath: "assets/images/",
    },
    scenes: {},
    articles: [],
    editor: {
        currentScene: "",
    },
}

export const store = legacy_createStore(reducer, storeDefaults, devToolsEnhancer({}))
