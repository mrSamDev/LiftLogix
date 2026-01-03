import { useEffect } from "react";
import { Stack, Redirect, useSegments, useRootNavigationState } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuthState } from "../src/store/authState";
import { queryClient } from "../src/lib/queryClient";

export default function RootLayout() {
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const { isAuthenticated, actions, user } = useAuthState();
  console.log("user: ", user);

  useEffect(() => {
    if (!navigationState?.key) return;
    actions.checkAuth();
  }, [navigationState?.key]);

  const isAuthRoute = segments[0] === "login" || segments[0] === "signup";
  const isCoachRoute = user?.role === "coach";
  const isUserRoute = user?.role === "user";
  const isOnCoachRoute = segments[0] === "coach";
  const isOnUserRoute = segments[0] === "clients";

  if (!isAuthenticated && !isAuthRoute) {
    return <Redirect href="/login" />;
  }

  if (isAuthenticated && isCoachRoute && !isOnCoachRoute) {
    return <Redirect href="/coach/(tabs)" />;
  }

  if (isAuthenticated && isUserRoute && !isOnUserRoute) {
    return <Redirect href="/clients/(tabs)" />;
  }

  if (isAuthenticated && isAuthRoute) {
    return <Redirect href="/" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
