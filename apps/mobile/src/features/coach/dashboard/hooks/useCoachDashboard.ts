import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../../../lib/api";
import { coachDashboardTransformer } from "../../../../transforms/coachDashboard";

interface DashboardAPIResponse {
  activeClients: number;
  totalClients: number;
}

export function useCoachDashboard() {
  return useQuery({
    queryKey: ["coach", "dashboard"],
    queryFn: async () => {
      const apiData = await apiFetch<DashboardAPIResponse>("/coach/dashboard");
      console.log("apiData: ", apiData);
      return coachDashboardTransformer.fromAPI(apiData);
    },
  });
}
