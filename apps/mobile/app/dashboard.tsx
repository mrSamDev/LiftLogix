import { Text, View } from "react-native";
import { Button } from "../src/components";
import { authClient } from "../src/lib/auth";

export default function Dashboard() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Dashboard Screen</Text>
    </View>
  );
}
