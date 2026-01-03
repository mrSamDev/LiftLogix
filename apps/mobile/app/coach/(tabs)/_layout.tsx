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
        tabBarLabel: "Dashboard",
      }}
    >
      <Tabs.Screen name="index" options={{}} />
      <Tabs.Screen name="clients" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
