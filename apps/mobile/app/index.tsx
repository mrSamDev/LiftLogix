import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <TouchableOpacity
        onPress={() => router.push("/dashboard")}
        style={{
          marginTop: 20,
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: "#007AFF",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white" }}>Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}
