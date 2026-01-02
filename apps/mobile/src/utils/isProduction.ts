import Constants from "expo-constants";
const isProduction = Constants.expoConfig?.extra?.env === "production" || process.env.NODE_ENV === "production";
export default isProduction;
