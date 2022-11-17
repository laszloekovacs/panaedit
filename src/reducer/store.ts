const storeDefaults: TStore = {
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
  scenes: {
    "demo": {}
  },
  articles: [],
  editor: {
    currentScene: "",
    workingDirectory: null,
  },
};

export default storeDefaults;
