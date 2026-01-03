import { Tabs } from "expo-router";

export default function CoachTabsLayout() {
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
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          tabBarLabel: "Workouts",
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
