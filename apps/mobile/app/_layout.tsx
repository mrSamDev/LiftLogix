import { useEffect } from "react";
import { Stack, Redirect, useSegments, useRootNavigationState } from "expo-router";

import { useAuthState } from "../src/store/authState";

export default function RootLayout() {
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const { isAuthenticated, checkAuth } = useAuthState();
  console.log("isAuthenticated: ", isAuthenticated);

  useEffect(() => {
    if (!navigationState?.key) return;
    checkAuth();
  }, [navigationState?.key]);

  const isAuthRoute = segments[0] === "login" || segments[0] === "signup";

  if (!isAuthenticated && !isAuthRoute) {
    return <Redirect href="/login" />;
  }

  if (isAuthenticated && isAuthRoute) {
    return <Redirect href="/" />;
  }

  return <Stack />;
}
