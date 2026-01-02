import { Platform } from "react-native";
import Constants from "expo-constants";

function getApiUrl(): string {
  const devServerUrl = Constants.expoConfig?.hostUri
    ? `http://${Constants.expoConfig.hostUri.split(':')[0]}:3000`
    : null;

  if (__DEV__) {
    if (Platform.OS === "android") {
      return devServerUrl || "http://10.0.2.2:3000";
    }
    return devServerUrl || "http://localhost:3000";
  }

  return process.env.EXPO_PUBLIC_API_URL || "https://api.production.com";
}

export const API_URL = getApiUrl();
