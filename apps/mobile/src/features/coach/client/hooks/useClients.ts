import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../../../lib/api";
import { clientTransformer } from "../../../../transforms/client";

interface ClientAPIResponse {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  joinedAt: string;
}

interface ClientsAPIResponse {
  clients: ClientAPIResponse[];
}

export function useClients() {
  return useQuery({
    queryKey: ["coach", "clients"],
    queryFn: async () => {
      const apiData = await apiFetch<ClientsAPIResponse>("/coach/clients");
      return clientTransformer.fromAPIList(apiData.clients);
    },
  });
}
