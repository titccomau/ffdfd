import { Platform } from "react-native";

export function isTVDevice(): boolean {
  // This is a simple check, but in a real app you'd want to use
  // more robust detection methods
  if (Platform.isTV) {
    return true;
  }
  
  if (Platform.OS === "android") {
    // Additional Android TV detection logic could go here
    return false;
  }
  
  return false;
}

export function isLeanbackSupported(): boolean {
  return Platform.OS === "android" && isTVDevice();
}

export function getTVFocusProperties() {
  if (isTVDevice()) {
    return {
      hasTVPreferredFocus: true,
      tvParallaxProperties: { enabled: false },
    };
  }
  return {};
}