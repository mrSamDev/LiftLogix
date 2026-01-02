import { useEffect } from "react";
import { Stack, Redirect, useSegments, useRootNavigationState } from "expo-router";
import { useAuthState } from "../src/store/authState";

export default function RootLayout() {
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const { isAuthenticated, actions, user } = useAuthState();

  useEffect(() => {
    if (!navigationState?.key) return;
    actions.checkAuth();
  }, [navigationState?.key]);

  const isAuthRoute = segments[0] === "login" || segments[0] === "signup";
  const isCoachRoute = user?.role === "coach";

  const isOnCoachRoute = segments[0] === "coach";

  if (!isAuthenticated && !isAuthRoute) {
    return <Redirect href="/login" />;
  }

  if (isAuthenticated && isCoachRoute && !isOnCoachRoute) {
    return <Redirect href="/coach/(tabs)" />;
  }

  if (isAuthenticated && isAuthRoute) {
    return <Redirect href="/" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
