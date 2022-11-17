export type SceneType = {
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
  scenes: {};
  articles: object[];
  editor: {
    currentScene: string;
    workingDirectory: null | any;
  };
};

export type ReduxActionType = {
  type: string;
  payload: unknown;
};

const storeDefaults: SceneType = {
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
    workingDirectory: null,
  },
};

export default storeDefaults;
