interface ClientAPIResponse {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  joinedAt: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  joinedAt: string;
}

export const clientTransformer = {
  fromAPI(apiData: ClientAPIResponse): Client {
    return {
      id: apiData.id,
      name: apiData.name,
      email: apiData.email,
      isActive: apiData.status === "active",
      joinedAt: apiData.joinedAt,
    };
  },

  fromAPIList(apiDataList: ClientAPIResponse[]): Client[] {
    return apiDataList.map(this.fromAPI);
  },
};
