
export type HotSpotType = {
    y: number
    x: number
}

export type SceneType = {
    title: string
    panorama: string
    northOffset: number
    hotSpots: HotSpotType[]
}

export type Store = {
    default: {
        firstScene: string
        sceneFadeDuration: number
        type: "equirectangular"
        autoLoad: boolean
        compass: boolean
        hotSpotDebug: boolean
        hfov: number
        vfow: number
        minPitch: number
        maxPitch: number
        basePath: string
        imagePath: string
    }
    scenes: { [key: string]: SceneType }
    articles: object[]
    editor: {
        currentScene: string
    }
}