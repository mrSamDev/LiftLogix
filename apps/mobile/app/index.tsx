import { Text, View, TouchableOpacity } from "react-native";
import { authClient, removeToken } from "../src/lib/auth";
import { useAuthState } from "../src/store/authState";

export default function Index() {
  const { setAuthenticated } = useAuthState();
  const logout = async () => {
    try {
      await authClient.signOut({});
      removeToken();
      setAuthenticated(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

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
        onPress={logout}
        style={{
          marginTop: 20,
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: "#007AFF",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
