import { apiFetch } from "@/apps/mobile/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Text } from "react-native";

export default function HomePage() {
  const { data: user, error } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      return await apiFetch("/clients/workout-list");
    },
  });

  console.log("user: ", user);
  console.log("error: ", error);

  return <Text>Welcome to the User Home Page!</Text>;
}
