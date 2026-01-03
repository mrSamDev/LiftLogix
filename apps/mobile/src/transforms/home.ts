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

interface HomeData {
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
    location: {
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

export const homeTransformer = {
  fromAPI(apiData: HomeAPIResponse): HomeData {
    return {
      user: {
        id: apiData.user.id,
        name: apiData.user.name,
        role: apiData.user.role,
        unitPreference: apiData.user.unitPreference,
      },
      organization: apiData.organization
        ? {
            id: apiData.organization.id,
            title: apiData.organization.title,
            image: apiData.organization.image,
            location: {
              latitude: apiData.organization.geoLocation.latitude,
              longitude: apiData.organization.geoLocation.longitude,
            },
          }
        : null,
      coach: apiData.coach
        ? {
            id: apiData.coach.id,
            name: apiData.coach.name,
            image: apiData.coach.image,
          }
        : null,
    };
  },
};
