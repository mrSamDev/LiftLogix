import { Tabs } from "expo-router";
import { useAuthState } from "../../../src/store/authState";

export default function CoachTabsLayout() {
  const user = useAuthState((state) => state.user);
  const coachName = user?.name || "Coach";

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: `Welcome - ${coachName}`,
          tabBarLabel: "Dashboard",
        }}
      />
      <Tabs.Screen
        name="clients"
        options={{
          title: `Welcome - ${coachName}`,
          tabBarLabel: "Clients",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: `Welcome - ${coachName}`,
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}
