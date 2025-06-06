export default {
  expo: {
    name: "Enchentes App",
    slug: "enchentes-app",
    version: "1.0.0",
    sdkVersion: "50.0.0",
    extra: {
        API_URL: "http://localhost:8080"
    },
    platforms: ["ios", "android", "web"],
    updates: {
      enabled: false,
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    }
  }
};
