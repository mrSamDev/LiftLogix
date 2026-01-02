import type { User } from "../features/users";

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

export type AuthSession = {
  user: User;
  isAuthenticated: boolean;
};
