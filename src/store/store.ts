import { legacy_createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { reducer } from "./reducer";

export type HotSpotType = {
    y: number;
    x: number;
};

export type SceneType = {
    title: string;
    panorama: string;
    northOffset?: number;
    hotspots: HotSpotType[] | null;
};

export type Store = {
    default: {
        firstScene: string;
        sceneFadeDuration: number;
        type: "equirectangular";
        autoLoad: boolean;
        compass: boolean;
        hotSpotDebug: boolean;
        hfov: number;
        vfow: number;
        minPitch: number;
        maxPitch: number;
        basePath: string;
        imagePath: string;
    };
    scenes: { [key: string]: SceneType } | null;
    articles: object[] | null;
    editor: {
        currentScene: string;
        workingDirectory: null | any;
    };
};

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
    scenes: null,
    articles: null,
    editor: {
        currentScene: "",
        workingDirectory: null,
    },
};

export const store = legacy_createStore(reducer, devToolsEnhancer({}));
