import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: process.env.APP_NAME as string,
  slug: 'lm-pharmacy-app',
  version: process.env.APP_VERSION as string,
  runtimeVersion: process.env.APP_VERSION as string,
  owner: 'khanhnguyen4999',
  scheme: 'lmpharmacyapp',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  splash: {
    image: './assets/images/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    bundleIdentifier: process.env.APP_ID as string,
    supportsTablet: true,
  },
  android: {
    package: process.env.APP_ID as string,
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
  },
  web: {
    bundler: 'metro',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
  ],
  extra: {
    eas: {
      projectId: 'def666df-9354-4c8b-93c8-4bc89abefa1a',
    },
  },
};

export default config;
