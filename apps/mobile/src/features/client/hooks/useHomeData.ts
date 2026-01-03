import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../../lib/api";
import { homeTransformer } from "../../../transforms/home";

interface HomeAPIResponse {
  user: {
    id: string;
    name: string;
    role: "coach" | "admin" | "user";
    unitPreference: "gram";
  };
  organization: {
    id: string;
    title: string;
    image: string;
    geoLocation: {
      latitude: number;
      longitude: number;
    };
  } | null;
  coach: {
    id: string;
    name: string;
    image: string | null;
  } | null;
}

export function useHomeData() {
  return useQuery({
    queryKey: ["user", "home"],
    queryFn: async () => {
      const apiData = await apiFetch<HomeAPIResponse>("/home");
      return homeTransformer.fromAPI(apiData);
    },
  });
}
