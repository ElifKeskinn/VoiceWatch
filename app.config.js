export default {
  expo: {
    name: "VoiceWatch",
    slug: "voicewatch",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/splash.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSMicrophoneUsageDescription:
          "Bu uygulama çevresel sesleri analiz etmek için mikrofon erişimi gerektirir.",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/splash.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/splash.png",
    },
    extra: {
      API_URL: "https://voicewatchbackend-production.up.railway.app/api/",
      WS_URL: "wss://voicewatchbackend-production.up.railway.app",
      eas: {
        projectId: "7666b333-da78-4057-b602-cf32ab39036e", // ✅ EKLENEN SATIR
      },
    },
  },
};
