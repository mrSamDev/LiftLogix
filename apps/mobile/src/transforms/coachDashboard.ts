interface DashboardAPIResponse {
  activeClients: number;
  totalClients: number;
}

interface DashboardData {
  activeClients: number;
  totalClients: number;
}

export const coachDashboardTransformer = {
  fromAPI(apiData: DashboardAPIResponse): DashboardData {
    return {
      activeClients: apiData.activeClients,
      totalClients: apiData.totalClients,
    };
  },
};
