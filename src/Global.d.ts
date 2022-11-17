declare type TStore = {
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
    scenes: { [key: string]: {} };
    articles: object[];
    editor: {
        currentScene: string;
        workingDirectory: null | any;
    };
};

declare type TAction = {
    type: string;
    payload: unknown;
};