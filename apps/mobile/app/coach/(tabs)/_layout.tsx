import { Tabs } from "expo-router";
import { useAuthState } from "../../../src/store/authState";

export default function CoachTabsLayout() {
  const user = useAuthState((state) => state.user);
  const coachName = user?.name || "Coach";

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        title: `LiftLogix`,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Dashboard",
        }}
      />
      <Tabs.Screen
        name="clients"
        options={{
          tabBarLabel: "Clients",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}
