export type UserRole = "admin" | "coach" | "user";

export type GeoLocation = {
  latitude: number;
  longitude: number;
};

export type Organization = {
  id: string;
  title: string;
  imageUrl: string;
  geoLocation: GeoLocation;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId: string | null;
  coachId: string | null;
};

export type AuthSession = {
  user: User;
  isAuthenticated: boolean;
};
