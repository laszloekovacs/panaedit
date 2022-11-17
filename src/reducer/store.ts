export type Scene = {
  title: string;
  panorama: string;
  northOffset?: number;
  hotspots?: any[] | null;
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
  scenes: { [key: string]: Scene };
  articles: object[];
  editor: {
    currentScene: string;
    workingDirectory: null | any;
  };
};

export type Action = {
  type: string;
  payload: unknown;
};

const storeDefaults: Store = {
  default: {
    firstScene: "demo",
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
  scenes: {
    demo: {},
  },
  articles: [],
  editor: {
    currentScene: "",
    workingDirectory: null,
  },
};

export default storeDefaults;
